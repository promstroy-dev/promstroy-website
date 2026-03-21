import { NextRequest, NextResponse } from "next/server";

// ── Simple in-memory rate limiter ──────────────────────────────────────────
// Per-IP: max 4 requests per 15 minutes. Resets on restart (acceptable for
// a contact form on a small commercial site — no Redis needed).
const RATE_LIMIT = 4;
const WINDOW_MS  = 15 * 60 * 1000; // 15 minutes

const ipLog = new Map<string, number[]>();

// On Vercel, x-forwarded-for is set by the Vercel edge — the first value is
// the real client IP. x-real-ip is also injected by Vercel as a convenience.
function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now  = Date.now();
  const hits = (ipLog.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= RATE_LIMIT) return true;
  hits.push(now);
  ipLog.set(ip, hits);
  return false;
}

// Periodic cleanup to avoid unbounded map growth
setInterval(() => {
  const now = Date.now();
  ipLog.forEach((hits, ip) => {
    const fresh = hits.filter((t: number) => now - t < WINDOW_MS);
    if (fresh.length === 0) ipLog.delete(ip);
    else ipLog.set(ip, fresh);
  });
}, WINDOW_MS);

// ── Helpers ────────────────────────────────────────────────────────────────

function getMskTime() {
  return new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow", hour12: false });
}

/** Escape special characters for Telegram MarkdownV2 */
function escapeMd(s: string): string {
  return s.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, "\\$&");
}

function validatePhone(raw: string): boolean {
  const clean = raw.replace(/[\s\-\(\)]/g, "");
  return /^(\+7|8)\d{10}$/.test(clean);
}

/** Validate that the request originates from this site (defense-in-depth CSRF guard).
 *  Browsers always send an Origin header for cross-origin POST requests;
 *  same-origin and programmatic requests may omit it, so we allow absent Origin. */
function isValidOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // non-browser / same-origin requests have no Origin header
  const siteUrl = process.env.SITE_URL ?? "https://sk-promstroy.ru";
  try {
    return origin === new URL(siteUrl).origin;
  } catch {
    return false;
  }
}

// ── Route handler ──────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Origin check — blocks cross-origin form submissions from other domains
  if (!isValidOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Rate limiting
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Слишком много запросов. Попробуйте через 15 минут." },
      { status: 429 }
    );
  }

  // Parse JSON body
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields, humans don't.
  // Silently return success so bots think the submission worked.
  const honeypot = typeof body._hp === "string" ? body._hp : "";
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  // Extract and sanitize fields
  const name       = typeof body.name        === "string" ? body.name.trim().slice(0, 100)        : "";
  const phone      = typeof body.phone       === "string" ? body.phone.trim().slice(0, 30)        : "";
  const message    = typeof body.message     === "string" ? body.message.trim().slice(0, 2000)    : "";
  const source_page= typeof body.source_page === "string" ? body.source_page.trim().slice(0, 200) : "";

  // Validate required fields
  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Введите ваше имя (минимум 2 символа)" }, { status: 400 });
  }
  if (!phone) {
    return NextResponse.json({ error: "Введите номер телефона" }, { status: 400 });
  }
  if (!validatePhone(phone)) {
    return NextResponse.json({ error: "Некорректный номер телефона" }, { status: 400 });
  }

  const token      = process.env.TELEGRAM_BOT_TOKEN;
  const chatId     = process.env.TELEGRAM_CHAT_ID;
  const formspreeId= process.env.NEXT_PUBLIC_FORMSPREE_ID;

  // 1. Try Telegram (MarkdownV2 — no raw HTML from user content)
  if (token && chatId) {
    const text = [
      "🔔 *Новая заявка с сайта*",
      "",
      `Имя: ${escapeMd(name)}`,
      `Телефон: ${escapeMd(phone)}`,
      `Сообщение: ${escapeMd(message || "—")}`,
      `Страница: ${escapeMd(source_page)}`,
      `Время: ${escapeMd(getMskTime())} МСК`,
    ].join("\n");

    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "MarkdownV2" }),
      });
      if (res.ok) return NextResponse.json({ ok: true });
      console.error("Telegram delivery failed:", res.status);
    } catch (err) {
      console.error("Telegram fetch error:", err);
    }
  }

  // 2. Fallback: Formspree
  if (formspreeId) {
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message, source_page }),
      });
      if (res.ok) return NextResponse.json({ ok: true });
      console.error("Formspree delivery failed:", res.status);
    } catch (err) {
      console.error("Formspree fetch error:", err);
    }
  }

  // All channels failed — return 500 so the form shows the "call us" message
  console.error("Form delivery: all channels exhausted");
  return NextResponse.json({ error: "Delivery failed" }, { status: 500 });
}

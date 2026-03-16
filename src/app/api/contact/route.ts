import { NextRequest, NextResponse } from "next/server";

function getMskTime() {
  return new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow", hour12: false });
}

export async function POST(req: NextRequest) {
  const { name, phone, message, source_page } = await req.json();

  if (!name || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

  // 1. Try Telegram
  if (token && chatId) {
    const text = `🔔 Новая заявка с сайта\n\nИмя: ${name}\nТелефон: ${phone}\nСообщение: ${message || "—"}\nСтраница: ${source_page}\nВремя: ${getMskTime()} МСК`;
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
      });
      if (res.ok) {
        return NextResponse.json({ ok: true });
      }
    } catch {
      // fall through to Formspree
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
      if (res.ok) {
        return NextResponse.json({ ok: true });
      }
    } catch {
      // both failed
    }
  }

  // Both failed or unconfigured — still return OK to user, but log
  console.error("Form delivery failed: no channels configured or all failed");
  return NextResponse.json({ ok: true }); // Don't expose delivery failure to user
}

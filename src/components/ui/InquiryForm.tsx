"use client";
import { useState, useRef, useEffect } from "react";
import MagneticButton from "@/components/ui/MagneticButton";

const MAX_CHARS = 500;

// Single digit cell — remounts (via key) when digit changes, triggering CSS animation
function AnimatedDigit({ digit, dir }: { digit: string; dir: "down" | "up" }) {
  return (
    <span
      style={{
        display: "inline-block",
        animation: `${dir === "down" ? "digitDown" : "digitUp"} 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) both`,
      }}
    >
      {digit}
    </span>
  );
}

function CharCounter({ remaining, dark }: { remaining: number; dark: boolean }) {
  // Track previous value to determine scroll direction
  const prevRef = useRef(remaining);
  const dir: "down" | "up" = remaining <= prevRef.current ? "down" : "up";
  useEffect(() => { prevRef.current = remaining; });

  const pct = (MAX_CHARS - remaining) / MAX_CHARS;
  const r = 7;
  const circ = 2 * Math.PI * r;
  const color =
    pct < 0.8
      ? dark ? "rgba(148,180,193,0.55)" : "rgba(122,142,152,0.7)"
      : pct < 0.95
      ? "#C4AE94"
      : "#ef4444";

  const digits = String(remaining).split("");

  return (
    <div className="flex items-center justify-end gap-1.5 mt-1.5 pr-0.5">
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
        <circle
          cx="9" cy="9" r={r} fill="none"
          stroke={dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}
          strokeWidth="2"
        />
        <circle
          cx="9" cy="9" r={r} fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - pct)}
          transform="rotate(-90 9 9)"
          style={{ transition: "stroke-dashoffset 0.1s ease, stroke 0.25s ease" }}
        />
      </svg>
      {/* Digit roll — each digit animates independently on change */}
      <span
        className="text-[11px] tabular-nums flex"
        style={{ color, overflow: "hidden", lineHeight: 1 }}
      >
        {digits.map((d, i) => (
          <AnimatedDigit key={`${i}-${d}`} digit={d} dir={dir} />
        ))}
      </span>
    </div>
  );
}

interface Props {
  sourcePage: string;
  dark?: boolean;
}

interface FieldErrors {
  name?: string;
  phone?: string;
}

function validatePhone(raw: string): boolean {
  // Accept +7XXXXXXXXXX, 8XXXXXXXXXX, or formatted variants with spaces/dashes/parens
  const clean = raw.replace(/[\s\-\(\)]/g, "");
  return /^(\+7|8)\d{10}$/.test(clean);
}

export default function InquiryForm({ sourcePage, dark = false }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot — hidden from humans, visible to bots. Must stay empty.
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "ratelimit">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<{ name?: boolean; phone?: boolean }>({});

  const validate = (): FieldErrors => {
    const e: FieldErrors = {};
    if (!name.trim() || name.trim().length < 2) {
      e.name = "Введите ваше имя";
    }
    if (!phone.trim()) {
      e.phone = "Введите номер телефона";
    } else if (!validatePhone(phone)) {
      e.phone = "Формат: +7 (999) 000-00-00";
    }
    return e;
  };

  const handleBlur = (field: "name" | "phone") => {
    setTouched((t) => ({ ...t, [field]: true }));
    const e = validate();
    setErrors((prev) => ({ ...prev, [field]: e[field] }));
  };

  const handleChange = (field: "name" | "phone", value: string) => {
    if (field === "name") setName(value);
    if (field === "phone") setPhone(value);
    // Clear error as user types once field was touched
    if (touched[field]) {
      const e = validate();
      setErrors((prev) => ({ ...prev, [field]: field === "name"
        ? (value.trim().length >= 2 ? undefined : e.name)
        : (validatePhone(value) ? undefined : e.phone)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, phone: true };
    setTouched(allTouched);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message, source_page: sourcePage, _hp: honeypot }),
      });
      if (res.ok) {
        setStatus("success");
        // Yandex.Metrica goal — fires only when counter is configured
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const w = window as any;
        if (typeof w.ym === "function") w.ym(w.__METRICA_ID, "reachGoal", "lead");
      } else if (res.status === 429) {
        setStatus("ratelimit");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const borderClass = (field: "name" | "phone") => {
    if (errors[field] && touched[field]) return dark ? "border-red-500/60" : "border-red-400";
    return dark
      ? "border-[rgba(196,174,148,0.20)] focus:border-[rgba(196,174,148,0.50)]"
      : "border-border focus:border-accent";
  };

  const inputBase = `w-full px-4 py-3 text-sm outline-none transition-colors duration-200 ${
    dark
      ? "bg-[rgba(8,14,22,0.42)] text-text-invert placeholder:text-[rgba(148,180,193,0.38)]"
      : "bg-white text-text placeholder:text-text-muted"
  }`;

  if (status === "success") {
    return (
      <div className={`py-8 text-center ${dark ? "text-text-invert" : "text-text"}`}>
        <div
          className="inline-flex items-center justify-center w-10 h-10 mb-4"
          style={{ background: "rgba(196,174,148,0.12)", border: "1px solid rgba(196,174,148,0.3)" }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 9L7.5 13.5L15 5" stroke="#C4AE94" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-base font-heading font-semibold mb-1">Заявка принята</p>
        <p className="text-sm text-text-muted">Перезвоним в течение 2 часов</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      {/* Honeypot trap — visually hidden, must stay empty; bots fill it */}
      <input
        type="text"
        name="_hp"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", opacity: 0, height: 0, width: 0, zIndex: -1, pointerEvents: "none" }}
      />
      {/* Name */}
      <div>
        <input
          className={`${inputBase} border ${borderClass("name")}`}
          type="text"
          placeholder="Имя *"
          value={name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "error-name" : undefined}
        />
        {errors.name && touched.name && (
          <p id="error-name" className="mt-1 text-xs text-red-400/90 pl-1">{errors.name}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <input
          className={`${inputBase} border ${borderClass("phone")}`}
          type="tel"
          placeholder="Телефон * (+7 999 000-00-00)"
          value={phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          onBlur={() => handleBlur("phone")}
          aria-required="true"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "error-phone" : undefined}
        />
        {errors.phone && touched.phone && (
          <p id="error-phone" className="mt-1 text-xs text-red-400/90 pl-1">{errors.phone}</p>
        )}
      </div>

      {/* Message + character counter */}
      <div>
        <textarea
          className={`${inputBase} border resize-none ${dark ? "border-[rgba(196,174,148,0.20)] focus:border-[rgba(196,174,148,0.50)]" : "border-border focus:border-accent"}`}
          placeholder="Описание задачи (необязательно)"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, 500))}
        />
        {message.length > 0 && (
          <CharCounter remaining={MAX_CHARS - message.length} dark={dark} />
        )}
      </div>

      {/* Submit */}
      <MagneticButton className="w-full" strength={5}>
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary disabled:opacity-60 py-3.5 px-6 text-sm justify-center gap-2 w-full"
        >
          {status === "loading" ? (
            <>
              <span
                className="inline-block w-4 h-4 border-2 rounded-full animate-spin"
                style={{ borderColor: "rgba(10,9,8,0.2)", borderTopColor: "#0A0908" }}
                aria-hidden="true"
              />
              Отправляем...
            </>
          ) : (
            "Начать проект"
          )}
        </button>
      </MagneticButton>

      {status === "error" && (
        <p className="text-red-400 text-sm text-center">
          Ошибка отправки. Позвоните нам напрямую.
        </p>
      )}
      {status === "ratelimit" && (
        <p className="text-sm text-center" style={{ color: "#C4AE94" }}>
          Слишком много попыток. Попробуйте через 15 минут или позвоните нам.
        </p>
      )}
    </form>
  );
}

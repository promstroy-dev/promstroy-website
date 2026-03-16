"use client";
import { useState } from "react";

interface Props {
  sourcePage: string;
  dark?: boolean;
}

export default function InquiryForm({ sourcePage, dark = false }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const inputClass = `w-full px-4 py-3 text-sm outline-none transition-colors duration-200 ${
    dark
      ? "bg-bg-dark border border-border-dark focus:border-accent text-text-invert placeholder:text-text-muted"
      : "bg-white border border-border focus:border-accent text-text placeholder:text-text-muted"
  }`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message, source_page: sourcePage }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={`py-6 text-center ${dark ? "text-text-invert" : "text-text"}`}>
        <p className="text-lg font-heading font-semibold mb-1">Заявка принята</p>
        <p className="text-sm text-text-muted">Перезвоним в течение 2 часов</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        className={inputClass}
        type="text"
        placeholder="Имя *"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className={inputClass}
        type="tel"
        placeholder="Телефон *"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <textarea
        className={`${inputClass} resize-none`}
        placeholder="Описание задачи (необязательно)"
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="disabled:opacity-60 font-semibold py-3.5 px-6 transition-all duration-200 hover:-translate-y-0.5 text-sm"
      style={{ background: "#C09A5C", color: "#0A0908", letterSpacing: "0.06em" }}
      >
        {status === "loading" ? "Отправляем..." : "Отправить заявку"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-sm text-center">Ошибка отправки. Позвоните нам напрямую.</p>
      )}
    </form>
  );
}

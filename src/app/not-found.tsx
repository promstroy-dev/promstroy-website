import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Страница не найдена",
};

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "#0A1520" }}
    >
      {/* Structural accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 5%, rgba(196,174,148,0.28) 40%, rgba(196,174,148,0.28) 60%, transparent 95%)",
        }}
      />

      <div className="text-center max-w-md">
        <p
          className="font-heading font-bold mb-4 leading-none"
          style={{ fontSize: "clamp(80px, 18vw, 160px)", color: "rgba(196,174,148,0.12)", letterSpacing: "-0.04em" }}
          aria-hidden="true"
        >
          404
        </p>

        <h1
          className="font-heading font-semibold mb-4"
          style={{ fontSize: "clamp(20px, 4vw, 28px)", color: "#F0EBE3" }}
        >
          Страница не найдена
        </h1>

        <p className="text-sm mb-8" style={{ color: "#7A8E98", lineHeight: 1.7 }}>
          Возможно, страница была удалена или адрес введён неверно.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="btn-primary px-6 py-3 text-sm justify-center"
          >
            На главную
          </Link>
          <Link
            href="/kontakty"
            className="btn-ghost-dark px-6 py-3 text-sm text-center"
            style={{ border: "1px solid rgba(196,174,148,0.25)", color: "rgba(240,235,227,0.65)" }}
          >
            Контакты
          </Link>
        </div>
      </div>
    </div>
  );
}

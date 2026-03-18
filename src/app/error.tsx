"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "#0A1520" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 5%, rgba(196,174,148,0.28) 40%, rgba(196,174,148,0.28) 60%, transparent 95%)",
        }}
      />

      <div className="text-center max-w-md">
        <h1
          className="font-heading font-semibold mb-4"
          style={{ fontSize: "clamp(20px, 4vw, 28px)", color: "#F0EBE3" }}
        >
          Что-то пошло не так
        </h1>

        <p className="text-sm mb-8" style={{ color: "#7A8E98", lineHeight: 1.7 }}>
          Произошла непредвиденная ошибка. Попробуйте обновить страницу.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="btn-primary px-6 py-3 text-sm justify-center"
          >
            Попробовать снова
          </button>
          <Link
            href="/"
            className="btn-ghost-dark px-6 py-3 text-sm text-center"
            style={{ border: "1px solid rgba(196,174,148,0.25)", color: "rgba(240,235,227,0.65)" }}
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}

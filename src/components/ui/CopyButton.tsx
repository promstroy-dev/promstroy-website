"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface Props {
  text: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function CopyButton({ text, children, className, style }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for older / restricted contexts
      const el = document.createElement("textarea");
      el.value = text;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`group flex items-center gap-2 transition-colors duration-200 ${className ?? ""}`}
      style={style}
      title={copied ? "Скопировано!" : `Скопировать`}
      type="button"
    >
      {children}
      <span
        className="flex-shrink-0 transition-all duration-200"
        style={{
          color: copied ? "#C4AE94" : "rgba(196,174,148,0.55)",
        }}
      >
        {copied ? <Check size={12} /> : <Copy size={12} className="opacity-65 group-hover:opacity-100 transition-opacity duration-200" />}
      </span>
    </button>
  );
}

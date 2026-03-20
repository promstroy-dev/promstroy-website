"use client";
import { Phone, Send } from "lucide-react";
import { company } from "@/data/company";

export default function MobileContactBar() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 flex border-t border-border-dark bg-bg-deep">
      <a
        href={`tel:${company.phone}`}
        className="flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold text-text-invert border-r border-border-dark hover:bg-bg-mid transition-colors"
      >
        <Phone size={16} className="text-accent" />
        Позвонить
      </a>
      <a
        href={`https://t.me/${company.telegram.replace("@", "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold bg-accent hover:bg-accent-hover text-bg-deep transition-colors"
      >
        <Send size={16} />
        Telegram
      </a>
    </div>
  );
}

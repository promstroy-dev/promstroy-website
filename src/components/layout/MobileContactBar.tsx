"use client";
import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { company } from "@/data/company";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileContactBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={`https://t.me/${company.telegram.replace("@", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden fixed z-50 flex items-center justify-center"
          style={{
            bottom: "1.25rem",
            right: "1.25rem",
            width: "3rem",
            height: "3rem",
            background: "linear-gradient(135deg, #CDB89E 0%, #BBA488 100%)",
            color: "#0A1520",
            boxShadow: "0 8px 28px rgba(196,174,148,0.30), 0 2px 8px rgba(0,0,0,0.20)",
          }}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          aria-label="Написать в Telegram"
        >
          <Send size={18} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

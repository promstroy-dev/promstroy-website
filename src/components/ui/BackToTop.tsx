"use client";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Вернуться наверх"
          className="fixed z-40 flex items-center justify-center cursor-pointer right-5 bottom-[4.75rem] md:bottom-7"
          style={{
            width: "2.5rem",
            height: "2.5rem",
            background: "#1A2B3D",
            border: "1px solid rgba(196,174,148,0.25)",
            color: "#C4AE94",
            boxShadow: "0 4px 18px rgba(0,0,0,0.32)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25 }}
        >
          <ArrowUp size={14} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

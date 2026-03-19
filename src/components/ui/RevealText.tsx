"use client";
import React from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  children: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  style?: React.CSSProperties;
  /** Pass the parent section's inView boolean so reveal fires with the section */
  inView: boolean;
  /** Base delay in seconds before first word animates */
  delay?: number;
}

/**
 * Splits heading text into words and reveals each word upward on scroll.
 * Uses the parent's inView state — no separate observer.
 * Fully accessible: text content is in the DOM for screen readers.
 */
export default function RevealText({
  children,
  as = "h2",
  className,
  style,
  inView,
  delay = 0.05,
}: Props) {
  const reducedMotion = useReducedMotion();
  const Tag = as as React.ElementType;
  const words = children.split(" ");

  return (
    <Tag className={className} style={style}>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          {/* overflow-hidden creates the "slot" the word slides up through */}
          <span
            style={{
              display: "inline-block",
              overflow: "hidden",
              // paddingBottom/marginBottom prevent descenders (y, р, g) from being clipped
              paddingBottom: "0.08em",
              marginBottom: "-0.08em",
              verticalAlign: "bottom",
            }}
          >
            <span
              style={{
                display: "inline-block",
                transform: !reducedMotion && !inView ? "translateY(112%)" : "translateY(0)",
                opacity: !reducedMotion && !inView ? 0 : 1,
                transition: reducedMotion
                  ? "none"
                  : `transform 0.72s cubic-bezier(0.22, 1, 0.36, 1) ${(delay + i * 0.06).toFixed(3)}s,
                     opacity 0.45s ease ${(delay + i * 0.06).toFixed(3)}s`,
              }}
            >
              {word}
            </span>
          </span>
          {/* Space between words, outside the overflow-hidden clip */}
          {i < words.length - 1 && "\u00A0"}
        </React.Fragment>
      ))}
    </Tag>
  );
}

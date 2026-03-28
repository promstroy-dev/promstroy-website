"use client";

/**
 * RollLink — slot-machine text swap on hover.
 *
 * The outer container is height-locked to exactly one line (1.3em)
 * with overflow hidden. Two copies of the text stack vertically
 * inside. On hover the stack translates up by one line height,
 * sliding copy-1 out and copy-2 in. Pure CSS — no JS state.
 */

interface RollLinkProps {
  children: string;
  className?: string;
  lineClassName?: string;
  duration?: number;
}

export default function RollLink({
  children,
  className = "",
  lineClassName = "",
  duration = 350,
}: RollLinkProps) {
  return (
    <span
      className={`roll-link inline-block overflow-hidden ${className}`}
      style={{ height: "1.3em", lineHeight: 1.3 }}
    >
      <span
        className="roll-link__inner flex flex-col"
        style={{
          transition: `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
      >
        <span className={`roll-link__line block ${lineClassName}`}>
          {children}
        </span>
        <span className={`roll-link__line block ${lineClassName}`} aria-hidden="true">
          {children}
        </span>
      </span>
    </span>
  );
}

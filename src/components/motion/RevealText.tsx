"use client";

import { motion, useReducedMotion } from "framer-motion";

type RevealTextProps = {
  lines: readonly string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  once?: boolean;
};

export function RevealText({
  lines,
  as: Tag = "h2",
  className,
  delay = 0,
  once = true,
}: RevealTextProps) {
  const reduced = useReducedMotion();

  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <span key={line} className="mask-line">
          <motion.span
            className="block"
            initial={reduced ? false : { y: "108%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once, amount: 0.35 }}
            transition={{
              duration: 0.85,
              delay: delay + index * 0.09,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

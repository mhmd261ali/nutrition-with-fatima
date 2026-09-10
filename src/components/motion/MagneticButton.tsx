"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useFinePointer } from "@/hooks/useFinePointer";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  showArrow?: boolean;
  onClick?: () => void;
};

export function MagneticButton({
  href,
  children,
  className,
  variant = "primary",
  external = false,
  showArrow = true,
  onClick,
}: MagneticButtonProps) {
  const fine = useFinePointer();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.4 });

  function handleMove(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!fine || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.28);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.28);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const styles = {
    primary:
      "bg-heading text-bg hover:bg-heading-strong",
    secondary:
      "border border-heading/35 bg-transparent text-heading hover:border-heading hover:bg-heading/6",
    ghost:
      "border border-bg/25 bg-bg/8 text-bg hover:bg-bg/16",
  } as const;

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={fine ? { x: springX, y: springY } : undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 py-3 text-[15px] font-medium transition-colors duration-300",
        styles[variant],
        className,
      )}
    >
      <span>{children}</span>
      {showArrow ? (
        <ArrowLeft
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
          strokeWidth={1.6}
        />
      ) : null}
    </motion.a>
  );
}

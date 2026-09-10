"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useFinePointer } from "@/hooks/useFinePointer";
import { cn } from "@/lib/utils";

type ClippedCircleProps = {
  circleClassName?: string;
  circleSize?: number;
};

export function ClippedCircle({
  circleClassName,
  circleSize = 360,
}: ClippedCircleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 28 });
  const springY = useSpring(y, { stiffness: 260, damping: 28 });
  const springScale = useSpring(scale, { stiffness: 220, damping: 24 });

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;

    if (!fine || reduced) {
      const enter = () => {
        const rect = parent.getBoundingClientRect();
        x.set(rect.width / 2);
        y.set(rect.height / 2);
        scale.set(1);
      };
      const leave = () => scale.set(0);
      parent.addEventListener("mouseenter", enter);
      parent.addEventListener("mouseleave", leave);
      return () => {
        parent.removeEventListener("mouseenter", enter);
        parent.removeEventListener("mouseleave", leave);
      };
    }

    const move = (event: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      x.set(event.clientX - rect.left);
      y.set(event.clientY - rect.top);
      scale.set(1);
    };
    const leave = () => scale.set(0);

    parent.addEventListener("mousemove", move);
    parent.addEventListener("mouseleave", leave);
    return () => {
      parent.removeEventListener("mousemove", move);
      parent.removeEventListener("mouseleave", leave);
    };
  }, [fine, reduced, scale, x, y]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        className={cn(
          "absolute rounded-full",
          circleClassName ??
            "bg-[color-mix(in_srgb,var(--muted)_52%,white)]",
        )}
        style={{
          width: circleSize,
          height: circleSize,
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
          scale: springScale,
        }}
      />
    </div>
  );
}

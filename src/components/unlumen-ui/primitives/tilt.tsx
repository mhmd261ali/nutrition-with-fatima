"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useFinePointer } from "@/hooks/useFinePointer";
import { cn } from "@/lib/utils";

export type TiltProps = {
  children: React.ReactNode;
  className?: string;
  rotationFactor?: number;
};

export function Tilt({
  children,
  className,
  rotationFactor = 11,
}: TiltProps) {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 28 });
  const springY = useSpring(y, { stiffness: 300, damping: 28 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [rotationFactor, -rotationFactor]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-rotationFactor, rotationFactor]);

  function onMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={cn("[transform-style:preserve-3d]", className)}
      style={
        enabled
          ? { rotateX, rotateY, transformPerspective: 900 }
          : undefined
      }
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

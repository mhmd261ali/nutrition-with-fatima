"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";

type NutrientParticlesProps = {
  className?: string;
  density?: number;
  colors?: string[];
};

const DEFAULT_COLORS = ["#C7D8E6", "#E6D7C3", "#5D7F82"];

export function NutrientParticles({
  className,
  density = 1,
  colors = DEFAULT_COLORS,
}: NutrientParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let running = true;
    const palette = colors.length ? colors : DEFAULT_COLORS;
    const bright = palette.every((color) => color.toUpperCase() === "#FFFFFF");
    const count = Math.round((isMobile ? 18 : 42) * density);

    const particles = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.00022,
      vy: (Math.random() - 0.5) * 0.00018,
      color: palette[Math.floor(Math.random() * palette.length)] ?? palette[0],
      a: bright ? Math.random() * 0.5 + 0.22 : Math.random() * 0.28 + 0.08,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      if (!running) return;
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.a;
        ctx.arc(p.x * rect.width, p.y * rect.height, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      frame = window.requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        running = Boolean(entry?.isIntersecting);
        if (running) draw();
        else window.cancelAnimationFrame(frame);
      },
      { threshold: 0.05 },
    );

    resize();
    io.observe(canvas);
    window.addEventListener("resize", resize);
    draw();

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, [colors, density, isMobile, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}

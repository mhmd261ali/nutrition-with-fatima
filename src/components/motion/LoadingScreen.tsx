"use client";

import { useEffect, useRef, useState } from "react";
import { animate, createTimeline, svg } from "animejs";
import { BrandMark } from "@/components/ui/BrandMark";
import { dietitian } from "@/data/site-content";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useLoading } from "@/components/motion/LoadingProvider";

export function LoadingScreen() {
  const { ready, setReady } = useLoading();
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const finish = () => {
      setReady(true);
      setVisible(false);
    };

    if (reduced) {
      const id = window.setTimeout(() => {
        setProgress(100);
        finish();
      }, 0);
      return () => window.clearTimeout(id);
    }

    if (started.current) return;
    started.current = true;

    const safety = window.setTimeout(reveal, 2200);

    function reveal() {
      window.clearTimeout(safety);
      if (!overlayRef.current) {
        finish();
        return;
      }

      animate(overlayRef.current, {
        clipPath: ["inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"],
        duration: 720,
        ease: "inOut(3)",
        onComplete: finish,
      });
    }

    try {
      const progressState = { value: 0 };
      const drawable = svg.createDrawable("#loader-orbit");
      const timeline = createTimeline({
        defaults: { ease: "out(3)" },
      });

      timeline.add(
        drawable,
        {
          draw: ["0 0", "0 1"],
          duration: 900,
          ease: "inOut(3)",
        },
        120,
      );

      if (labelRef.current) {
        const letters = labelRef.current.querySelectorAll("span");
        timeline.add(
          letters,
          {
            opacity: [0, 1],
            y: [8, 0],
            delay: (_el: unknown, i = 0) => i * 16,
            duration: 360,
          },
          380,
        );
      }

      timeline.add(
        progressState,
        {
          value: 100,
          duration: 780,
          ease: "inOut(2)",
          onUpdate: () => setProgress(Math.round(progressState.value)),
        },
        220,
      );

      timeline.call(reveal);
    } catch {
      reveal();
    }

    return () => window.clearTimeout(safety);
  }, [reduced, setReady]);

  if (!visible) return null;

  const label = dietitian.englishTitle;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[80] grid place-items-center bg-bg"
      role="status"
      aria-live="polite"
      aria-busy={!ready}
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="flex flex-col items-center gap-6 px-6">
        <div className="relative grid place-items-center">
          <svg
            viewBox="0 0 200 200"
            className="absolute h-[16.5rem] w-[16.5rem] text-heading/55 sm:h-[18.5rem] sm:w-[18.5rem]"
            aria-hidden="true"
          >
            <circle
              id="loader-orbit"
              cx="100"
              cy="100"
              r="92"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
              pathLength="1"
            />
          </svg>
          <div className="loader-mark">
            <BrandMark size="xl" priority />
          </div>
        </div>
        <p
          ref={labelRef}
          className="text-[13px] text-muted"
          aria-hidden="true"
        >
          {label.split(" ").map((word, index) => (
            <span key={`${word}-${index}`} className="inline-block">
              {index > 0 ? "\u00A0" : null}
              {word}
            </span>
          ))}
        </p>
        <p className="font-en text-xs tracking-[0.22em] text-heading/70">
          {progress.toString().padStart(2, "0")}
        </p>
      </div>
      <span className="sr-only">جاري تحميل الموقع</span>
    </div>
  );
}

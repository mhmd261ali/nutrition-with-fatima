"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { contentCreation, dietitian } from "@/data/site-content";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { cn } from "@/lib/utils";
import {
  BookOpenCheck,
  Flower2,
  HeartPulse,
  Lightbulb,
  Salad,
  Scale,
  type LucideIcon,
} from "lucide-react";

const ZOOM_IN = 1.2;

const topicCards: {
  icon: LucideIcon;
}[] = [
  { icon: Salad },
  { icon: Scale },
  { icon: HeartPulse },
  { icon: Flower2 },
  { icon: BookOpenCheck },
  { icon: Lightbulb },
];

export function ContentCreation() {
  const reduced = useReducedMotion();

  return (
    <section id="content" className="relative bg-surface">
      {reduced ? <StaticScene /> : <PinnedScene />}
    </section>
  );
}

function PinnedScene() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [contentLive, setContentLive] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.62, 1], [1, ZOOM_IN, ZOOM_IN]);
  const veil = useTransform(
    scrollYProgress,
    [0.58, 0.78, 1],
    [0.06, 0.28, 0.28],
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0.64, 0.82, 1],
    [0, 1, 1],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0.64, 0.82, 1],
    [28, 0, 0],
  );

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value >= 0.8) {
      setRevealed(true);
      setContentLive(true);
      return;
    }
    if (value < 0.45) {
      setRevealed(false);
      setContentLive(false);
      return;
    }
    setContentLive(value >= 0.64);
  });

  return (
    <div ref={trackRef} className="h-[240vh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div
          style={{ scale }}
          className="absolute inset-0 origin-center will-change-transform"
        >
          <Image
            src={contentCreation.image.src}
            alt={contentCreation.image.alt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 shadow-[inset_0_48px_90px_rgba(61,85,88,0.2),inset_0_-36px_70px_rgba(61,85,88,0.16)]"
          />
        </motion.div>
        <motion.div
          style={{ opacity: revealed ? 0.28 : veil }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-bg"
        />
        <motion.div
          style={
            revealed
              ? { opacity: 1, y: 0 }
              : { opacity: contentOpacity, y: contentY }
          }
          className={cn(
            "relative z-10 h-full overflow-y-auto pt-24 pb-8",
            contentLive || revealed
              ? "pointer-events-auto"
              : "pointer-events-none",
          )}
        >
          <Copy compact />
        </motion.div>
      </div>
    </div>
  );
}

function StaticScene() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={contentCreation.image.src}
          alt={contentCreation.image.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-bg/22 shadow-[inset_0_48px_90px_rgba(61,85,88,0.22),inset_0_-36px_70px_rgba(61,85,88,0.18)]"
        />
      </div>
      <div className="relative z-10 py-[var(--space-section)]">
        <Copy />
      </div>
    </div>
  );
}

function Copy({ compact = false }: { compact?: boolean }) {
  return (
    <div className="site-container">
      <div className={cn("max-w-3xl", compact ? "mb-6 md:mb-8" : "mb-12")}>
        <h2
          className={cn(
            "section-display drop-shadow-[0_1px_10px_rgba(243,246,244,0.7)]",
            compact && "text-[clamp(1.65rem,1.15rem+1.7vw,3rem)]",
          )}
        >
          {contentCreation.headingAr}
        </h2>
        <p
          className={cn(
            "mt-5 max-w-2xl text-heading-strong",
            compact && "line-clamp-2 md:line-clamp-none",
          )}
        >
          {contentCreation.text}
        </p>
      </div>

      <div
        className={cn(
          "grid sm:grid-cols-2 lg:grid-cols-3",
          compact ? "mb-6 grid-cols-2 gap-2.5 sm:gap-3" : "mb-10 gap-4",
        )}
      >
        {contentCreation.topics.map((topic, index) => {
          const Icon = topicCards[index]?.icon ?? Salad;
          const beige = index % 2 === 1;

          return (
            <article
              key={topic.en}
              className={cn(
                "flex flex-col justify-between rounded-[28px] border border-heading/10 shadow-[0_10px_28px_rgba(61,85,88,0.1)] backdrop-blur-md",
                beige ? "bg-sand" : "bg-surface-warm",
                compact ? "min-h-0 p-4 md:p-5" : "min-h-[220px] p-7",
              )}
            >
              <Icon
                className="text-heading"
                size={compact ? 22 : 26}
                strokeWidth={1.4}
                aria-hidden="true"
              />
              <div className={compact ? "mt-3" : undefined}>
                <p
                  className={cn(
                    "font-medium text-heading",
                    compact ? "text-base md:text-lg" : "text-lg",
                  )}
                >
                  {topic.ar}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <MagneticButton href={dietitian.instagram} external>
        {contentCreation.cta}
      </MagneticButton>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { philosophy } from "@/data/site-content";
import { RevealText } from "@/components/motion/RevealText";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { cn } from "@/lib/utils";

const PRINCIPLES = philosophy.principles;
const COUNT = PRINCIPLES.length;
const STEP = 360 / COUNT;

export function Philosophy() {
  const reduced = useReducedMotion();

  return (
    <section id="philosophy" className="relative bg-sand">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(243,246,244,0.62),transparent_42%),radial-gradient(circle_at_84%_78%,rgba(199,216,230,0.38),transparent_40%)]" />
      {reduced ? <StaticPrinciples /> : <PinnedOrbit />}
    </section>
  );
}

function Heading({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("max-w-3xl", compact ? "mb-0" : "mb-10")}>
      {compact ? (
        <h2 className="text-[clamp(1.35rem,1.15rem+0.8vw,1.85rem)] leading-snug font-medium text-heading">
          {philosophy.heading}
        </h2>
      ) : (
        <RevealText lines={[philosophy.heading]} className="section-display" />
      )}
      {compact ? (
        <p className="mt-1.5 max-w-2xl text-base leading-[1.7] text-heading-strong lg:text-lg">
          {philosophy.statement}
        </p>
      ) : (
        <ScrollReveal>
          <p className="mt-8 max-w-2xl text-xl leading-[1.9] text-heading-strong">
            {philosophy.statement}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}

function StaticPrinciples() {
  return (
    <div className="site-container relative pt-[var(--space-section)] pb-[calc(var(--space-section)+2rem)]">
      <Heading />
      <div className="mx-auto mb-8 grid h-32 w-32 place-items-center rounded-full border border-heading/20 bg-bg/80">
        <span className="text-xl font-medium text-heading">{philosophy.centerWord}</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRINCIPLES.map((item) => (
          <article
            key={item.text}
            className="rounded-[28px] border border-heading/12 bg-bg/75 p-5 text-center"
          >
            <p className="mb-2 text-sm font-medium text-heading">{item.title}</p>
            <p className="text-[15px] leading-relaxed text-ink">{item.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function PinnedOrbit() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const [radius, setRadius] = useState(200);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setRadius(Math.round(Math.min(280, width * 0.3, height * 0.28)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      ref={trackRef}
      className="relative"
      style={{ height: `${COUNT * 100}vh` }}
    >
      <div className="sticky top-0 isolate flex h-svh flex-col overflow-hidden pb-16 md:pb-20">
        <div className="site-container relative shrink-0 pt-24">
          <Heading compact />
        </div>
        <div className="relative flex min-h-0 flex-1 items-center justify-center pb-4">
          <div
            className="relative"
            style={{ width: radius * 2 + 220, height: radius * 2 + 200 }}
          >
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div
                className="rounded-full border border-heading/15"
                style={{ width: radius * 2, height: radius * 2 }}
              />
            </div>

            <motion.div className="absolute inset-0" style={{ rotate }}>
              {PRINCIPLES.map((item, index) => (
                <OrbitCard
                  key={item.text}
                  item={item}
                  index={index}
                  radius={radius}
                  rotate={rotate}
                />
              ))}
            </motion.div>

            <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center">
              <div className="grid h-24 w-24 place-items-center rounded-full border border-heading/20 bg-bg/90 text-center shadow-[0_0_0_12px_rgba(243,246,244,0.35)] sm:h-32 sm:w-32">
                <span className="text-lg font-medium text-heading sm:text-2xl">
                  {philosophy.centerWord}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrbitCard({
  item,
  index,
  radius,
  rotate,
}: {
  item: (typeof PRINCIPLES)[number];
  index: number;
  radius: number;
  rotate: MotionValue<number>;
}) {
  const angle = index * STEP;
  const counter = useTransform(rotate, (value) => -(angle + value));
  const blur = useTransform(rotate, (value) => {
    const past = -value - index * STEP;
    if (past >= 0) return 0;
    if (past >= -32) return (-past / 32) * 6;
    return 6;
  });
  const opacity = useTransform(rotate, (value) => {
    const past = -value - index * STEP;
    if (past >= 0) return 1;
    if (past >= -32) return 0.55 + ((past + 32) / 32) * 0.45;
    return 0.5;
  });
  const scale = useTransform(rotate, (value) => {
    const dist = topDistance(angle + value);
    const past = -value - index * STEP;
    if (dist < 28) return 1.08 - (dist / 28) * 0.1;
    if (past >= 0) return 0.98;
    return 0.86;
  });
  const zIndex = useTransform(rotate, (value) => {
    const past = -value - index * STEP;
    const dist = topDistance(angle + value);
    if (dist < 28) return 40;
    return past >= 0 ? 18 : 8;
  });
  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{
        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
      }}
    >
      <motion.article
        style={{ rotate: counter, filter, opacity, scale, zIndex }}
        className={cn(
          "w-[10.25rem] rounded-[28px] border border-heading/12 bg-bg/85 p-4 text-center sm:w-48 sm:p-5",
          "shadow-[0_18px_40px_-28px_rgba(61,85,88,0.55)]",
        )}
      >
        <p className="mb-2 text-sm font-medium text-heading">{item.title}</p>
        <p className="text-[13px] leading-relaxed text-ink sm:text-[15px]">{item.text}</p>
      </motion.article>
    </div>
  );
}

function topDistance(degrees: number) {
  const wrapped = ((degrees % 360) + 360) % 360;
  return Math.min(wrapped, 360 - wrapped);
}

"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Apple, ClipboardCheck, MessageCircle } from "lucide-react";
import { dietitian, hero } from "@/data/site-content";
import { HeroPortrait } from "@/components/hero/HeroPortrait";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useLoading } from "@/components/motion/LoadingProvider";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { getBookingHref, isExternalBooking } from "@/lib/booking";

const HeroScene = dynamic(
  () => import("./HeroScene").then((mod) => mod.HeroScene),
  { ssr: false, loading: () => <div className="h-full w-full" /> },
);

const floatingIcons = [Apple, ClipboardCheck, MessageCircle] as const;

const fade = (delay: number, reduced: boolean) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
      };

export function Hero() {
  const { ready } = useLoading();
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile(1024);
  const animate = ready || reduced;

  return (
    <section
      id="home"
      className="relative overflow-x-hidden pt-28 pb-20 lg:min-h-[100svh] lg:pt-32 lg:pb-16"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <svg className="absolute top-24 -start-20 h-[420px] w-[420px] text-heading/10" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="170" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="8 12" />
        </svg>
      </div>

      <div className="site-container grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        <div>
          <motion.p
            {...fade(0.08, reduced)}
            animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-heading/12 bg-surface/70 px-4 py-2 text-sm text-heading"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-heading" />
            {hero.badge}
            <span className="text-[12px] text-muted">{hero.badgeEn}</span>
          </motion.p>

          <h1 className="hero-display mb-7">
            <span className="mask-line">
              <motion.span
                className="block"
                initial={reduced ? false : { y: "110%" }}
                animate={animate ? { y: 0 } : { y: "110%" }}
                transition={{
                  duration: 0.9,
                  delay: 0.16,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
              >
                {hero.headline}
              </motion.span>
            </span>
          </h1>

          <motion.p
            {...fade(0.38, reduced)}
            animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            className="mb-9 max-w-xl text-[17px] leading-[2] text-ink md:text-[18px]"
          >
            {hero.supporting}
          </motion.p>

          <motion.div
            {...fade(0.48, reduced)}
            animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            className="flex flex-wrap items-center gap-3"
          >
            <MagneticButton href={getBookingHref()} external={isExternalBooking()}>
              {hero.ctaPrimary}
            </MagneticButton>
            <MagneticButton href="#services" variant="secondary">
              {hero.ctaSecondary}
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          {...fade(0.58, reduced)}
          animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          className="relative overflow-visible pb-10"
        >
          <HeroPortrait />
          <motion.div
            className="pointer-events-none absolute -bottom-2 start-2 z-10 h-40 w-40 sm:h-48 sm:w-48 lg:-bottom-6 lg:start-[-4.5rem] lg:h-60 lg:w-60"
            animate={animate ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {animate ? <HeroScene simplified={isMobile} /> : null}
          </motion.div>
          <div className="absolute top-4 -end-1 z-10 flex flex-col gap-3 sm:top-6 sm:-end-2">
            {hero.floatingWords.map((word, index) => {
              const Icon = floatingIcons[index] ?? Apple;
              return (
                <span
                  key={word}
                  className="float-soft flex max-w-[8.5rem] flex-col items-center gap-1.5 rounded-[20px] border border-heading/10 bg-surface/90 px-3 py-2.5 text-center text-[11px] leading-snug text-heading sm:max-w-[9.5rem] sm:text-[12px]"
                  style={{ animationDelay: `${index * 0.6}s` }}
                >
                  <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                  {word}
                </span>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div className="site-container mt-16 flex items-center justify-between gap-6">
        <p className="text-[13px] text-muted">{dietitian.title}</p>
        <a
          href="#about"
          className="group inline-flex items-center gap-3 text-sm text-heading"
        >
          <span>اكتشف المزيد</span>
          <span className="relative h-10 w-px overflow-hidden bg-heading/20">
            <span className="absolute inset-x-0 top-0 h-4 w-px animate-pulse bg-heading" />
          </span>
        </a>
      </div>
    </section>
  );
}

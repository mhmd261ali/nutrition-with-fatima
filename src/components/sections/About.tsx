"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ClipboardList, Heart, Sprout } from "lucide-react";
import { about } from "@/data/site-content";
import { RevealText } from "@/components/motion/RevealText";
import { NutrientParticles } from "@/components/motion/NutrientParticles";
import { MovingWords } from "@/components/ui/MovingWords";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";

const CARD_BACKGROUNDS = ["bg-surface-warm", "bg-sand", "bg-mist"] as const;
const CARD_ICONS = [Heart, ClipboardList, Sprout] as const;
const CARD_TILTS = [-5, 4, -3] as const;
const STACK_Y = [72, 0, -72] as const;
const FLAT_Y = [0, 0, 0] as const;
const PARTICLE_COLORS = ["#FFFFFF"];

export function About() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile(640);
  const stackY = isMobile ? FLAT_Y : STACK_Y;
  const travel = isMobile ? 16 : 72;
  const tilts = isMobile ? FLAT_Y : CARD_TILTS;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.15"],
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative flex min-h-svh flex-col bg-heading pb-24 text-bg"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <NutrientParticles
          className="h-full w-full"
          density={3.2}
          colors={PARTICLE_COLORS}
        />
      </div>
      <div className="site-container relative flex flex-1 flex-col justify-center">
        <RevealText
          lines={about.heading}
          className="max-w-4xl text-[clamp(1.45rem,1.1rem+1.5vw,2.5rem)] leading-snug font-medium !text-bg"
        />
        <div className="mt-8 grid grid-cols-1 items-start gap-5 py-2 sm:grid-cols-3 sm:gap-5 sm:py-16">
          {about.cards.map((text, index) =>
            reduced ? (
              <article
                key={text}
                className={cn(
                  "rounded-[28px] border border-bg/12 p-5 text-heading sm:rounded-[32px] sm:p-7",
                  CARD_BACKGROUNDS[index],
                )}
                style={{ transform: `translateY(${stackY[index]}px)` }}
              >
                <CardCopy index={index} text={text} />
              </article>
            ) : (
              <FloatingCard
                key={text}
                text={text}
                index={index}
                progress={scrollYProgress}
                stackY={stackY[index]}
                travel={travel}
                tilt={tilts[index]}
              />
            ),
          )}
        </div>
      </div>
      <div className="relative mt-8">
        <MovingWords onDark />
      </div>
    </section>
  );
}

function CardCopy({ index, text }: { index: number; text: string }) {
  const Icon = CARD_ICONS[index];

  return (
    <>
      <Icon
        className="mb-4 text-heading/55"
        size={22}
        strokeWidth={1.4}
        aria-hidden="true"
      />
      <p className="text-[15px] leading-[1.9] sm:text-[17px]">{text}</p>
    </>
  );
}

function FloatingCard({
  text,
  index,
  progress,
  stackY,
  travel,
  tilt,
}: {
  text: string;
  index: number;
  progress: MotionValue<number>;
  stackY: number;
  travel: number;
  tilt: number;
}) {
  const shift = 0.08 * index;
  const y = useTransform(progress, (value) => {
    const t = Math.min(1, Math.max(0, (value - shift) / (1 - 0.16)));
    if (t < 0.22) return stackY + (1 - t / 0.22) * travel;
    if (t > 0.78) return stackY - ((t - 0.78) / 0.22) * travel;
    return stackY;
  });
  const rotate = useTransform(progress, (value) => {
    const t = Math.min(1, Math.max(0, (value - shift) / (1 - 0.16)));
    if (t < 0.22) return tilt * (t / 0.22);
    if (t > 0.78) return tilt * (1 - (t - 0.78) / 0.22);
    return tilt;
  });

  return (
    <motion.article
      style={{ y, rotate, zIndex: index + 1 }}
      className={cn(
        "relative rounded-[28px] border border-bg/12 p-5 text-heading shadow-[0_18px_40px_-22px_rgba(61,85,88,0.5)] will-change-transform sm:rounded-[32px] sm:p-7",
        CARD_BACKGROUNDS[index],
      )}
    >
      <CardCopy index={index} text={text} />
    </motion.article>
  );
}

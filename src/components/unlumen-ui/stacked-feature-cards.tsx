"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const SPRING = { stiffness: 300, damping: 28 } as const;

export type HeroCard = {
  imageSrc?: string;
  imageAlt?: string;
  badge: string;
  title: string;
  description: string;
  href: string;
};

export type FeatureCard = {
  value: string;
  title: string;
  description: string;
  icon: LucideIcon;
  cardClassName?: string;
  iconClassName?: string;
  rotateClassName?: string;
};

type StackedFeatureCardsProps = {
  heroCard: HeroCard;
  featureCards: FeatureCard[];
  sectionTitle?: string;
  className?: string;
  id?: string;
};

export function StackedFeatureCards({
  heroCard,
  featureCards,
  sectionTitle,
  className,
  id,
}: StackedFeatureCardsProps) {
  return (
    <section id={id} className={cn("section-space relative", className)}>
      <div className="site-container">
        {sectionTitle ? (
          <div className="mb-12 max-w-3xl">
            <h2 className="section-display">{sectionTitle}</h2>
          </div>
        ) : null}

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-8">
          <HeroPanel card={heroCard} />
          <div className="relative">
            {featureCards.map((card, index) => (
              <FeaturePanel
                key={card.value}
                card={card}
                index={index}
                isLast={index === featureCards.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroPanel({ card }: { card: HeroCard }) {
  const reduced = useReducedMotion();
  const y = useSpring(0, SPRING);
  const scale = useSpring(1, SPRING);
  const hasImage = Boolean(card.imageSrc);

  function hover(active: boolean) {
    if (reduced) return;
    y.set(active ? -10 : 0);
    scale.set(active ? 1.015 : 1);
  }

  return (
    <motion.a
      href={card.href}
      onMouseEnter={() => hover(true)}
      onMouseLeave={() => hover(false)}
      style={reduced ? undefined : { y, scale }}
      className="group relative isolate flex min-h-[22rem] flex-col overflow-hidden rounded-[40px] bg-heading text-bg lg:sticky lg:top-24"
    >
      <div
        className={cn(
          "relative z-10 mt-auto flex flex-1 flex-col justify-end px-7 pb-16 sm:px-9",
          hasImage ? "pt-52" : "pt-16",
        )}
      >
        <span className="mb-5 inline-flex w-fit rounded-full border border-bg/20 bg-bg/10 px-3 py-1 text-[12px]">
          {card.badge}
        </span>
        <h3 className="mb-3 max-w-lg text-[1.65rem] leading-snug font-medium sm:text-3xl">{card.title}</h3>
        <p className="mb-8 max-w-md text-[15px] leading-relaxed text-mist">{card.description}</p>
        <span className="relative inline-flex size-11 items-center justify-center overflow-hidden rounded-full bg-bg text-heading">
          <ArrowLeft
            aria-hidden="true"
            strokeWidth={1.6}
            className="absolute size-4 transition-transform duration-300 group-hover:-translate-x-5 group-hover:-translate-y-5"
          />
          <ArrowLeft
            aria-hidden="true"
            strokeWidth={1.6}
            className="absolute size-4 translate-x-5 translate-y-5 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
          />
          <span className="sr-only">المزيد</span>
        </span>
      </div>

      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full text-bg"
        viewBox="0 0 600 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 42C72 72 128 8 200 38C272 68 328 10 400 36C472 62 528 18 600 44V80H0Z"
          fill="color-mix(in srgb, var(--mist) 35%, var(--bg))"
        />
      </svg>
    </motion.a>
  );
}

function FeaturePanel({
  card,
  index,
  isLast,
}: {
  card: FeatureCard;
  index: number;
  isLast: boolean;
}) {
  const Icon = card.icon;
  const reduced = useReducedMotion();
  const slotRef = useRef<HTMLDivElement>(null);
  const isFirst = index === 0;

  const { scrollYProgress } = useScroll({
    target: slotRef,
    offset: ["start end", "start 0.22"],
  });

  const y = useTransform(scrollYProgress, [0, 1], isFirst ? ["0%", "0%"] : ["55%", "0%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 1],
    isFirst ? [1, 1, 1] : [0, 1, 1],
  );

  return (
    <div
      ref={slotRef}
      className={cn("relative", isLast ? "min-h-[15rem]" : "h-[58svh] min-h-[22rem]")}
    >
      <motion.article
        className={cn(
          "sticky top-24 w-full rounded-[32px] border border-heading/10 p-6 shadow-[0_12px_40px_-28px_rgba(61,85,88,0.45)] lg:p-7",
          card.rotateClassName,
          card.cardClassName,
        )}
        style={{
          zIndex: index + 1,
          y: reduced ? 0 : y,
          opacity: reduced ? 1 : opacity,
        }}
      >
        <div className="mb-8 flex items-start justify-between gap-4">
          <span
            className={cn(
              "grid size-11 place-items-center rounded-2xl",
              card.iconClassName,
            )}
          >
            <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <span className="font-en text-sm tracking-[0.18em] text-heading/45">
            {card.value}
          </span>
        </div>
        <h3 className="mb-3 text-xl font-medium">{card.title}</h3>
        <p className="text-[15px] leading-relaxed">{card.description}</p>
      </motion.article>
    </div>
  );
}

"use client";

import { useCallback, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  MessageCircle,
  Scale,
  Sprout,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/site-content";
import { RevealText } from "@/components/motion/RevealText";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  clipboardList: ClipboardList,
  scale: Scale,
  stethoscope: Stethoscope,
  messageCircle: MessageCircle,
  sprout: Sprout,
  bookOpen: BookOpen,
};

const VISIBLE = 3;
const ease = [0.22, 1, 0.36, 1] as const;

export function Services() {
  const items = services.items;
  const count = items.length;
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const labelId = useId();
  const pointerX = useRef<number | null>(null);
  const reduced = useReducedMotion();

  const goTo = useCallback(
    (nextIndex: number) => {
      const target = ((nextIndex % count) + count) % count;
      if (target === active) return;
      const forward = (target - active + count) % count;
      const backward = (active - target + count) % count;
      setDirection(forward <= backward ? 1 : -1);
      setActive(target);
    },
    [active, count],
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  const visible = Array.from({ length: VISIBLE }, (_, slot) => {
    const index = (active + slot) % count;
    return { ...items[index], index, slot };
  });

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerX.current = event.clientX;
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerX.current == null) return;
    const delta = event.clientX - pointerX.current;
    pointerX.current = null;
    if (Math.abs(delta) < 48) return;
    if (delta < 0) next();
    else prev();
  };

  return (
    <section id="services" className="section-space bg-bg">
      <div className="site-container">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <RevealText lines={[services.heading]} className="section-display" />
          </div>
          <div className="flex items-end justify-between gap-6 md:flex-col md:items-end">
            <p className="max-w-md text-ink">{services.subtitle}</p>
            <div className="flex items-center gap-2" dir="ltr">
              <CarouselButton label="الخدمة السابقة" onClick={prev}>
                <ChevronLeft size={18} strokeWidth={1.6} />
              </CarouselButton>
              <CarouselButton label="الخدمة التالية" onClick={next}>
                <ChevronRight size={18} strokeWidth={1.6} />
              </CarouselButton>
            </div>
          </div>
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-labelledby={labelId}
          className="outline-none"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              next();
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              prev();
            }
          }}
        >
          <p id={labelId} className="sr-only">
            {services.heading}
          </p>
          <div
            dir="ltr"
            className="grid h-[22rem] touch-pan-y grid-cols-[minmax(0,3fr)_minmax(0,1fr)_minmax(0,1fr)] gap-3 select-none sm:h-[26rem] sm:gap-4"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              pointerX.current = null;
            }}
          >
            {visible.map((item) => {
              const Icon = icons[item.icon] ?? ClipboardList;
              const featured = item.slot === 0;

              return (
                <div
                  key={item.slot}
                  className="relative h-full min-w-0 overflow-hidden"
                >
                  <motion.div
                    key={item.id}
                    initial={reduced ? false : { x: direction * 36 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: reduced ? 0 : 0.45, ease }}
                    className="h-full"
                  >
                    <ServiceCard
                      english={item.en}
                      arabic={item.ar}
                      icon={Icon}
                      large={featured}
                      compact={!featured}
                      onSelect={featured ? undefined : () => goTo(item.index)}
                      selectLabel={item.en}
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>

          <div
            className="mt-6 flex items-center justify-center gap-2"
            dir="ltr"
          >
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={item.en}
                aria-current={index === active ? "true" : undefined}
                onClick={() => goTo(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === active
                    ? "w-8 bg-heading"
                    : "w-2 bg-heading/25 hover:bg-heading/45",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CarouselButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex size-11 items-center justify-center rounded-full border border-heading/15 text-heading transition-colors hover:border-heading/35 hover:bg-surface"
    >
      {children}
    </button>
  );
}

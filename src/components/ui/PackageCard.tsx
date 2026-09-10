"use client";

import { Check } from "lucide-react";
import { packages } from "@/data/site-content";
import { TiltCard } from "@/components/unlumen-ui/tilt-card";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { getBookingHref } from "@/lib/booking";

type PackageItem = (typeof packages.items)[number];

type PackageCardProps = {
  pkg: PackageItem;
  delay?: number;
  followUpSessions: number | null;
  featuredLabel: string;
};

export function PackageCard({
  pkg,
  delay = 0,
  followUpSessions,
  featuredLabel,
}: PackageCardProps) {
  const includes = pkg.includes.map((item) => {
    if (pkg.id === "monthly" && item === "عدد جلسات متابعة") {
      return followUpSessions
        ? `${followUpSessions} جلسات متابعة`
        : "عدد جلسات متابعة";
    }
    return item;
  });

  return (
    <ScrollReveal delay={delay} className="h-full">
      <TiltCard
        title={`${pkg.emoji} ${pkg.name}`}
        price={`${pkg.currency}${pkg.price}`}
        badgeLabel={pkg.featured ? featuredLabel : undefined}
        badgeVariant="warning"
        href={getBookingHref()}
        className="flex h-full min-h-[34rem] flex-col justify-between bg-bg/85 md:h-auto"
        tiltProps={{ rotationFactor: 6 }}
      >
        <ul className="relative z-20 mb-6 space-y-3">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-ink">
              <Check
                className="mt-1 size-4 shrink-0 text-heading"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <span className="bg-heading text-bg relative z-20 mt-auto inline-flex min-h-11 w-full items-center justify-center rounded-full px-5 text-sm font-medium">
          {pkg.cta}
        </span>
      </TiltCard>
    </ScrollReveal>
  );
}

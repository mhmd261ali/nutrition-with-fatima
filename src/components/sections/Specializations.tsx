"use client";

import { StackedFeatureCards } from "@/components/unlumen-ui/stacked-feature-cards";
import { specializations, dietitian, services, about } from "@/data/site-content";
import { getBookingHref } from "@/lib/booking";
import {
  Activity,
  Flower2,
  HeartPulse,
  Scale,
  Sprout,
  Stethoscope,
} from "lucide-react";

const heroCard = {
  badge: dietitian.englishTitle,
  title: about.heading.join(" "),
  description: services.subtitle,
  href: getBookingHref(),
};

const featureCards = [
  {
    value: "01",
    title: specializations.items[0].en,
    description: specializations.items[0].ar,
    icon: Scale,
    cardClassName: "bg-surface text-heading-strong",
    iconClassName: "bg-mist/70 text-heading",
    rotateClassName: "rotate-[-1.2deg]",
  },
  {
    value: "02",
    title: specializations.items[1].en,
    description: specializations.items[1].ar,
    icon: Stethoscope,
    cardClassName: "bg-sand/55 text-heading-strong",
    iconClassName: "bg-sand text-heading",
    rotateClassName: "rotate-[1deg]",
  },
  {
    value: "03",
    title: specializations.items[2].en,
    description: specializations.items[2].ar,
    icon: HeartPulse,
    cardClassName: "bg-mist/45 text-heading-strong",
    iconClassName: "bg-mist text-heading",
    rotateClassName: "rotate-[-0.8deg]",
  },
  {
    value: "04",
    title: specializations.items[3].en,
    description: specializations.items[3].ar,
    icon: Activity,
    cardClassName: "bg-surface text-heading-strong",
    iconClassName: "bg-heading/10 text-heading",
    rotateClassName: "rotate-[1.1deg]",
  },
  {
    value: "05",
    title: specializations.items[4].en,
    description: specializations.items[4].ar,
    icon: Flower2,
    cardClassName: "bg-sand/40 text-heading-strong",
    iconClassName: "bg-sand text-heading",
    rotateClassName: "rotate-[-1deg]",
  },
  {
    value: "06",
    title: specializations.items[5].en,
    description: specializations.items[5].ar,
    icon: Sprout,
    cardClassName: "bg-mist/35 text-heading-strong",
    iconClassName: "bg-mist/80 text-heading",
    rotateClassName: "rotate-[0.7deg]",
  },
];

export function Specializations() {
  return (
    <StackedFeatureCards
      id="specializations"
      heroCard={heroCard}
      featureCards={featureCards}
      sectionTitle={specializations.heading}
      className="bg-mist/35"
    />
  );
}

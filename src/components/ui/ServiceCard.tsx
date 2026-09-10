import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  english: string;
  arabic: string;
  icon: LucideIcon;
  large?: boolean;
  compact?: boolean;
  onSelect?: () => void;
  selectLabel?: string;
};

export function ServiceCard({
  english,
  arabic,
  icon: Icon,
  large = false,
  compact = false,
  onSelect,
  selectLabel,
}: ServiceCardProps) {
  const className = cn(
    "group relative h-full overflow-hidden rounded-[32px] border border-heading/10 bg-surface transition-all duration-500",
    compact
      ? "flex w-full flex-col items-center justify-center p-3 text-center sm:items-stretch sm:justify-between sm:p-5 sm:text-start hover:border-heading/25"
      : "p-7 hover:-translate-y-1 hover:border-heading/25",
    large && "md:p-10",
  );

  const inner = (
    <>
      <div
        className={cn(
          "absolute rounded-full bg-mist/30 transition-transform duration-700 group-hover:translate-x-3 group-hover:translate-y-2",
          compact ? "-start-10 -top-10 h-20 w-20" : "-start-8 -top-8 h-24 w-24",
        )}
      />
      <Icon
        className={cn(
          "relative text-heading",
          compact ? "mb-0 sm:mb-8" : "mb-6 sm:mb-8",
        )}
        strokeWidth={1.4}
        size={large ? 28 : 22}
        aria-hidden="true"
      />
      <p
        className={cn(
          "relative mb-2 font-medium text-heading",
          compact
            ? "hidden text-sm leading-snug sm:line-clamp-3 sm:block"
            : large
              ? "text-lg"
              : "text-base",
        )}
      >
        {english}
      </p>
      <p
        className={cn(
          "relative leading-relaxed text-ink",
          compact
            ? "hidden text-sm sm:line-clamp-6 sm:block"
            : large
              ? "text-lg"
              : "text-base",
        )}
      >
        {arabic}
      </p>
    </>
  );

  if (onSelect) {
    return (
      <button
        type="button"
        dir="rtl"
        className={className}
        onClick={onSelect}
        aria-label={selectLabel ?? arabic}
      >
        {inner}
      </button>
    );
  }

  return (
    <article dir="rtl" className={className}>
      {inner}
    </article>
  );
}

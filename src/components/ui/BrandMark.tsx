import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
  priority?: boolean;
};

const sizes = {
  sm: "h-11 w-11",
  md: "h-14 w-14",
  lg: "h-[7.5rem] w-[7.5rem]",
  xl: "h-[11.5rem] w-[11.5rem] sm:h-[13rem] sm:w-[13rem]",
};

const pixels = {
  sm: 88,
  md: 112,
  lg: 240,
  xl: 416,
} as const;

export function BrandMark({
  className,
  size = "sm",
  label = "فاطمة شعيب",
  priority = false,
}: BrandMarkProps) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-full bg-[#F6F3EC]",
        sizes[size],
        className,
      )}
    >
      <Image
        src="/images/brand/logo.png"
        alt={label}
        width={pixels[size]}
        height={pixels[size]}
        priority={priority}
        className="h-full w-full object-cover"
      />
    </span>
  );
}

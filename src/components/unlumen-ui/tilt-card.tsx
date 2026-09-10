"use client";

import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { ClippedCircle } from "@/components/unlumen-ui/primitives/clipped-circle";
import { Tilt, type TiltProps } from "@/components/unlumen-ui/primitives/tilt";

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  /** left half of the split badge pill; shown as a simple pill if `badgeLabel` is omitted */
  price?: string;
  /** right half of the split pill, coloured by `badgeVariant` */
  badgeLabel?: string;
  badgeVariant?: "success" | "warning";
  imageSrc?: string;
  imageAlt?: string;
  /** wraps the card in a plain `<a>` tag */
  href?: string;
  children?: React.ReactNode;
  tiltProps?: Omit<TiltProps, "children" | "className">;
}

const BADGE_LABEL_CLASSES: Record<
  NonNullable<TiltCardProps["badgeVariant"]>,
  string
> = {
  success: "bg-heading/12 text-heading",
  warning: "bg-sand text-heading-strong",
};

export function TiltCard({
  title,
  description,
  price,
  badgeLabel,
  badgeVariant = "success",
  imageSrc,
  imageAlt = "",
  href,
  children,
  tiltProps,
  className,
  ...props
}: TiltCardProps) {
  const inner = (
    <Tilt
      rotationFactor={7}
      {...tiltProps}
      className={cn(
        "group relative flex h-48 w-full flex-col overflow-hidden rounded-[32px] border border-heading/12 bg-surface sm:h-52 md:h-56",
        "transition-[box-shadow,transform] duration-400 ease-out hover:border-heading/22",
        className,
      )}
    >
      <div className="relative z-20 flex flex-row justify-between gap-3 px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h2 className="text-lg leading-tight font-medium tracking-tight text-heading">
            {title}
          </h2>
          {description ? (
            <p className="text-sm text-ink/80">{description}</p>
          ) : null}
        </div>

        {price && badgeLabel ? (
          <div className="inline-flex h-fit shrink-0 items-center whitespace-nowrap">
            <span className="font-en bg-mist/50 h-fit rounded-s-full px-3.5 py-2 text-2xl leading-none font-semibold text-heading">
              {price}
            </span>
            <span
              className={cn(
                "h-fit rounded-e-full px-3 py-2 text-sm font-medium",
                BADGE_LABEL_CLASSES[badgeVariant],
              )}
            >
              {badgeLabel}
            </span>
          </div>
        ) : price ? (
          <span className="font-en bg-mist/50 h-fit shrink-0 rounded-full px-4 py-2 text-2xl leading-none font-semibold whitespace-nowrap text-heading">
            {price}
          </span>
        ) : null}
      </div>

      {children ? (
        <div className="relative z-20 flex flex-1 flex-col px-5 pb-6 sm:px-6">
          {children}
        </div>
      ) : null}

      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={288}
          height={224}
          className={cn(
            "border-heading/10 absolute top-[6.75rem] -end-10 z-10 w-72 rounded-md border",
            "rotate-[-5deg] transition-transform duration-300 ease-out",
            "group-hover:-translate-y-1 group-hover:rotate-[-3deg]",
          )}
        />
      ) : null}

      <ClippedCircle circleSize={360} />
    </Tilt>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block h-full cursor-pointer"
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {inner}
      </a>
    );
  }

  return (
    <div className="h-full" {...props}>
      {inner}
    </div>
  );
}

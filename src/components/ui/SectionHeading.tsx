import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center";
};

export function SectionHeading({
  eyebrow,
  children,
  className,
  align = "start",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-4 text-[13px] font-medium text-muted">{eyebrow}</p>
      ) : null}
      <h2 className="section-display">{children}</h2>
    </div>
  );
}

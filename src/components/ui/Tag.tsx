import { cn } from "@/lib/utils";

type TagProps = {
  children: React.ReactNode;
  className?: string;
};

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-heading/15 bg-surface/60 px-4 py-2 text-sm text-heading",
        className,
      )}
    >
      {children}
    </span>
  );
}

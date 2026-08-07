import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  onDark = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "block text-xs font-semibold uppercase tracking-[0.2em]",
            onDark ? "text-teal" : "text-accent"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "title-underline mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl",
          onDark ? "text-white on-dark" : "text-ink",
          align === "center" && "center"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-6 text-base leading-relaxed sm:text-lg",
            onDark ? "text-white/70" : "text-ink/60"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ArrowList({
  items,
  onDark = false,
  className,
}: {
  items: string[];
  onDark?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn("space-y-2.5", className)}>
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "group flex items-start gap-2.5 text-sm transition-transform duration-200 hover:translate-x-1",
            onDark ? "text-white/85" : "text-ink/70"
          )}
        >
          <ChevronRight
            className={cn(
              "mt-0.5 size-3.5 shrink-0 transition-colors",
              onDark ? "text-white group-hover:text-teal" : "text-accent group-hover:text-teal"
            )}
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

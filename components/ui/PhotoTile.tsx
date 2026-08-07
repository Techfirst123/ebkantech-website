import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Stands in for photography: a toned gradient panel with a centered icon,
 * used everywhere the reference design uses a real photo.
 */
export default function PhotoTile({
  icon: Icon,
  tone = "navy",
  className,
  label,
}: {
  icon: LucideIcon;
  tone?: "navy" | "gold";
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden",
        tone === "navy"
          ? "bg-[linear-gradient(135deg,#0c111f_0%,#1b2338_55%,#3a2f18_100%)]"
          : "bg-[linear-gradient(135deg,#90753b_0%,#6b5426_65%,#0c111f_130%)]",
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 14px)",
        }}
        aria-hidden="true"
      />
      <Icon className="relative size-14 text-white/90" strokeWidth={1.25} aria-hidden="true" />
      {label && (
        <span className="absolute bottom-0 left-0 w-full bg-black/30 px-3 py-2 text-xs font-medium text-white">
          {label}
        </span>
      )}
    </div>
  );
}

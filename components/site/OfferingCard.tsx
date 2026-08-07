import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import PhotoTile from "@/components/ui/PhotoTile";

export default function OfferingCard({
  href,
  icon,
  name,
  tagline,
  tone = "navy",
}: {
  href: string;
  icon: LucideIcon;
  name: string;
  tagline: string;
  tone?: "navy" | "gold";
}) {
  return (
    <Link href={href} className="group flex h-full flex-col">
      <div className="relative">
        <PhotoTile icon={icon} tone={tone} />
        <span className="absolute -bottom-px left-0 h-2 w-full bg-white" aria-hidden="true" />
      </div>
      <div className="flex flex-1 flex-col bg-accent px-6 py-6 text-left transition-colors group-hover:bg-ink">
        <span className="font-display text-base font-semibold uppercase tracking-wide text-white">
          {name}
        </span>
        <p className="mt-2 text-sm leading-relaxed text-white/75">{tagline}</p>
      </div>
    </Link>
  );
}

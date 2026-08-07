import { type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import ReadMore from "@/components/ui/ReadMore";
import ArrowList from "@/components/ui/ArrowList";
import PhotoTile from "@/components/ui/PhotoTile";

export default function AlternatingBlock({
  icon,
  eyebrow,
  title,
  description,
  points,
  ctaHref,
  ctaLabel,
  reversed = false,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  ctaHref: string;
  ctaLabel: string;
  reversed?: boolean;
}) {
  return (
    <section className="bg-accent py-16 sm:py-20">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <Reveal className={reversed ? "lg:order-2" : ""}>
          <PhotoTile icon={icon} tone="navy" />
        </Reveal>

        <Reveal delay={0.08} className={reversed ? "lg:order-1" : ""}>
          <div className="relative pl-8">
            <span className="absolute left-0 top-2 h-0.5 w-10 bg-white" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              {eyebrow}
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">{title}</h2>
            <p className="mt-4 text-base leading-relaxed text-white/80">{description}</p>
            <ArrowList items={points} onDark className="mt-6" />
            <ReadMore href={ctaHref} onDark className="mt-7">
              {ctaLabel}
            </ReadMore>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

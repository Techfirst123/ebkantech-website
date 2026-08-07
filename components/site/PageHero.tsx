import { type ReactNode } from "react";
import Container from "@/components/ui/Container";

export default function PageHero({
  eyebrow,
  title,
  description,
  icon,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="banner-overlay relative flex min-h-[320px] items-center overflow-hidden bg-[linear-gradient(135deg,#0c111f_0%,#1b2338_50%,#3a2f18_100%)] py-16">
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 18px)",
        }}
        aria-hidden="true"
      />

      <Container className="relative max-w-3xl">
        {icon && (
          <span className="mb-6 flex size-14 items-center justify-center bg-white/10 text-teal">
            {icon}
          </span>
        )}
        <span className="inline-block bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
          {eyebrow}
        </span>
        <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-white text-balance sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
            {description}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}

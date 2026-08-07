import type { Metadata } from "next";
import { HardHat, Factory, Building, Boxes } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import ArrowList from "@/components/ui/ArrowList";
import CTABanner from "@/components/home/CTABanner";
import { industries } from "@/lib/data";

export const metadata: Metadata = {
  title: "Industries | Ebkan Tech",
  description:
    "Ebkan Tech serves construction & EPC, manufacturing, real estate, and enterprises needing custom ERP/CRM.",
};

const ICONS = [HardHat, Factory, Building, Boxes];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Deep expertise where it's rare"
        description="We specialize in the operational complexity of physical industries — where off-the-shelf software usually falls short."
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {industries.map((industry, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <Reveal key={industry.slug} delay={(i % 2) * 0.08}>
                  <div
                    id={industry.slug}
                    className="scroll-mt-28 flex h-full flex-col border border-ink/10 p-8"
                  >
                    <span className="flex size-12 items-center justify-center bg-accent/10 text-accent">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <h2 className="mt-5 font-display text-xl font-semibold text-ink">
                      {industry.name}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink/60">
                      {industry.description}
                    </p>
                    <ArrowList items={industry.points} className="mt-5" />
                    <Button href="/contact" variant="secondary" className="mt-7 w-fit">
                      Discuss your industry
                    </Button>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}

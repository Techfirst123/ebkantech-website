import type { Metadata } from "next";
import { Target, Eye, ShieldCheck, Users2, Rocket, Heart } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import CTABanner from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "About Us | Ebkan Tech",
  description:
    "Ebkan Tech is an AI-driven IT services and products company built by engineers who've worked inside construction, EPC, and enterprise operations.",
};

const VALUES = [
  { icon: Target, title: "Outcomes over output", description: "We measure success by the metrics that matter to your business, not lines of code shipped." },
  { icon: ShieldCheck, title: "Reliability first", description: "Enterprise systems don't get to fail quietly. We build and operate for uptime and trust." },
  { icon: Rocket, title: "AI-native thinking", description: "We ask where intelligence and automation fit before writing a single line of code." },
  { icon: Heart, title: "Long-term partnership", description: "We stay accountable well past launch — our clients keep working with us for years." },
];

const TIMELINE = [
  { year: "2013", title: "Founded", description: "Started as a small web development studio serving local enterprises." },
  { year: "2017", title: "Cloud & DevOps practice launched", description: "Expanded into cloud architecture as clients scaled beyond a single server." },
  { year: "2020", title: "First ERP client in construction", description: "Built our first vertical ERP for an EPC contractor — and never looked back." },
  { year: "2023", title: "AI layer introduced", description: "Embedded ML/BI and chat assistants across every product and engagement." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Ebkan Tech"
        title="Built by engineers who've sat where you sit"
        description="We started as a services shop solving hard technical problems for enterprise clients — and grew into a product company because we kept rebuilding the same systems for construction and EPC teams."
      />

      <section className="bg-white py-20 sm:py-24">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Reveal className="border border-ink/10 p-8">
            <Target className="size-8 text-accent" aria-hidden="true" />
            <h2 className="mt-4 font-display text-xl font-semibold text-ink">Our mission</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/60">
              To give operations-heavy businesses the same level of software
              sophistication that pure tech companies take for granted — with
              AI built in from day one.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="border border-ink/10 p-8">
            <Eye className="size-8 text-accent" aria-hidden="true" />
            <h2 className="mt-4 font-display text-xl font-semibold text-ink">Our vision</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/60">
              A future where every construction site, vendor network, and
              enterprise operation runs on systems that predict problems
              before they happen.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="What we value"
            title="The principles behind how we work"
            align="center"
            className="mx-auto text-center"
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} delay={i * 0.08}>
                  <div className="h-full bg-white p-6 border border-ink/10">
                    <span className="flex size-11 items-center justify-center bg-accent/10 text-accent">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-sm font-semibold text-ink">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/60">{v.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Our journey" title="From services studio to product company" />
          <div className="mt-12 space-y-8 border-l border-ink/10 pl-8">
            {TIMELINE.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.08} className="relative">
                <span className="absolute -left-[2.35rem] top-1 flex size-4 items-center justify-center rounded-full bg-accent">
                  <span className="size-1.5 rounded-full bg-white" />
                </span>
                <p className="text-sm font-semibold text-accent">{item.year}</p>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <Container className="max-w-3xl text-center">
          <Users2 className="mx-auto size-9 text-accent" aria-hidden="true" />
          <h2 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
            A team of 60+ engineers, analysts, and AI specialists
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink/60">
            Distributed across time zones, aligned on one standard: build
            things that hold up under real operational pressure.
          </p>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}

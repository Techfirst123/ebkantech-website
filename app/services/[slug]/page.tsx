import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/site/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import CTABanner from "@/components/home/CTABanner";
import { services } from "@/lib/data";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.name} | Ebkan Tech`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = service.icon;

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.name}
        description={service.description}
        icon={<Icon className="size-7" aria-hidden="true" />}
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/contact" variant="primary">
            Get a Quote
          </Button>
          <Button href="/contact" variant="onDark">
            Talk to Us
          </Button>
        </div>
      </PageHero>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="What's included"
            title="Capabilities within this service"
            description="A breakdown of what our team covers as part of this engagement."
          />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {service.capabilities.map((cap, i) => (
              <Reveal key={cap.title} delay={(i % 2) * 0.08}>
                <div className="h-full border border-ink/10 p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">
                    {cap.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{cap.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="A clear, predictable process"
            description="No black boxes — you'll know exactly what's happening at every stage."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="border border-accent/20 bg-white p-6">
                  <span className="font-display text-3xl font-bold text-accent/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}

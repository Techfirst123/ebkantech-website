import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import OfferingCard from "@/components/site/OfferingCard";
import CTABanner from "@/components/home/CTABanner";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "IT Services | Ebkan Tech",
  description:
    "Web development, DevOps & cloud engineering, data analytics & BI, machine learning, and AI chatbot development — delivered by senior engineers.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Engineering capability, applied to your roadmap"
        description="Five focused practices — each can run standalone or together as one integrated engagement, with AI woven through every deliverable."
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 0.08}>
                <OfferingCard
                  href={`/services/${service.slug}`}
                  icon={service.icon}
                  name={service.name}
                  tagline={service.description}
                  tone="navy"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}

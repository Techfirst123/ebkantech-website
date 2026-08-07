import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import OfferingCard from "@/components/site/OfferingCard";
import { services, products } from "@/lib/data";

const OFFERINGS = [
  ...services.map((s) => ({
    href: `/services/${s.slug}`,
    icon: s.icon,
    name: s.name,
    tagline: s.short,
    tone: "navy" as const,
  })),
  ...products.map((p) => ({
    href: `/products/${p.slug}`,
    icon: p.icon,
    name: p.name,
    tagline: p.short,
    tone: "gold" as const,
  })),
];

export default function DivisionsGrid() {
  return (
    <section className="bg-mist py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="What we offer"
          align="center"
          title="Services & Products, at a glance"
          description="Eight focused offerings — five services and three products — each engineered around a single outcome."
          className="mx-auto text-center"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {OFFERINGS.map((offering, i) => (
            <Reveal key={offering.href} delay={(i % 4) * 0.06}>
              <OfferingCard {...offering} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

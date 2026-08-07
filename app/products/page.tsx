import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import OfferingCard from "@/components/site/OfferingCard";
import CTABanner from "@/components/home/CTABanner";
import { products } from "@/lib/data";

export const metadata: Metadata = {
  title: "IT Products | Ebkan Tech",
  description:
    "Purpose-built ERP for construction & EPC, CRM for vendor & site management, and AI-powered add-ons for every product.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Software built around how you actually operate"
        description="Ready-to-deploy ERP and CRM platforms for construction, EPC, and multi-site enterprises — with AI capability built in, not bolted on."
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {products.map((product, i) => (
              <Reveal key={product.slug} delay={i * 0.08}>
                <OfferingCard
                  href={`/products/${product.slug}`}
                  icon={product.icon}
                  name={product.name}
                  tagline={product.description}
                  tone="gold"
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

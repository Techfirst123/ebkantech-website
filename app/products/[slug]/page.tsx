import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sparkles } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import PhotoTile from "@/components/ui/PhotoTile";
import CTABanner from "@/components/home/CTABanner";
import { products } from "@/lib/data";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} | Ebkan Tech`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const Icon = product.icon;

  return (
    <>
      <PageHero
        eyebrow={product.audience}
        title={product.name}
        description={product.description}
        icon={<Icon className="size-7" aria-hidden="true" />}
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/contact" variant="primary">
            Request a Demo
          </Button>
          <Button href="/contact" variant="onDark">
            Talk to Sales
          </Button>
        </div>
      </PageHero>

      <section className="bg-white py-20 sm:py-24">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Core features"
              title="What's built in"
              className="max-w-none"
            />
            <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {product.features.map((f) => (
                <li key={f.title} className="border-l-2 border-accent/30 pl-4">
                  <p className="text-sm font-semibold text-ink">{f.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/60">{f.description}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <PhotoTile icon={Icon} tone="gold" />
        </Container>
      </section>

      <section className="bg-ink py-20 sm:py-24">
        <Container className="max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal">
            <Sparkles className="size-3.5" aria-hidden="true" />
            AI inside {product.name}
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">
            Intelligence built into every workflow
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {product.aiFeatures.map((f, i) => (
              <Reveal key={f} delay={i * 0.08}>
                <div className="h-full border border-white/10 bg-white/5 p-5 text-left">
                  <p className="text-sm leading-relaxed text-white/75">{f}</p>
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

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function CTABanner() {
  return (
    <section className="bg-accent py-16 text-center sm:py-20">
      <Container>
        <Reveal>
          <h2 className="font-display text-3xl font-bold text-white text-balance sm:text-4xl">
            Ready to modernize your operations?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80">
            Talk to our team about your systems, and we&apos;ll show you exactly
            where AI-driven services and products can move the needle.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact" variant="onDark">
              Contact Sales
            </Button>
            <Button href="/contact" variant="onDark">
              Book a Demo
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

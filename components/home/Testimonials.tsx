import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const TESTIMONIALS = [
  {
    quote:
      "The construction ERP gave our project managers real-time visibility they never had before. The AI assistant alone has saved our site leads hours every week.",
    name: "Amara Osei",
    title: "VP of Operations, Meridian EPC",
    initials: "AO",
  },
  {
    quote:
      "Ebkan Tech's team felt like an extension of ours. They understood our vendor management headaches immediately and shipped a CRM that actually fit how we work.",
    name: "Daniel Reyes",
    title: "COO, Coreline Manufacturing",
    initials: "DR",
  },
  {
    quote:
      "We came in for a DevOps engagement and left with a full cloud strategy that cut our infrastructure spend by over a quarter. Highly recommend.",
    name: "Priya Nathan",
    title: "Head of Engineering, Solace Retail",
    initials: "PN",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-ink py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          align="center"
          onDark
          title="Trusted by teams who need it to work"
          className="mx-auto text-center"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col border-l-2 border-accent bg-ink-2 p-7">
                <blockquote className="flex-1 text-sm leading-relaxed text-white/70">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">{t.name}</span>
                    <span className="block text-xs text-white/50">{t.title}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

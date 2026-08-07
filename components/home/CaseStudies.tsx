import { TrendingUp } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const CASES = [
  {
    metric: "40%",
    result: "reduction in site reporting time",
    client: "Meridian EPC",
    summary:
      "Replaced paper-based daily reports with our construction ERP's mobile site reporting and automated summaries.",
  },
  {
    metric: "3.2x",
    result: "faster vendor onboarding",
    client: "Coreline Manufacturing",
    summary:
      "Centralized vendor compliance and approvals in our CRM, cutting a multi-week process down to days.",
  },
  {
    metric: "27%",
    result: "lower cloud infrastructure spend",
    client: "Solace Retail",
    summary:
      "Re-architected infrastructure with right-sized cloud resources and automated CI/CD pipelines.",
  },
];

export default function CaseStudies() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Success stories"
          title="Outcomes our clients measure"
          description="A few of the results teams have seen after bringing Ebkan Tech in."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {CASES.map((item, i) => (
            <Reveal key={item.client} delay={i * 0.08}>
              <div className="flex h-full flex-col border border-ink/10 p-7">
                <span className="flex size-10 items-center justify-center bg-accent/10 text-accent">
                  <TrendingUp className="size-5" aria-hidden="true" />
                </span>
                <p className="mt-5 font-display text-3xl font-bold text-accent">{item.metric}</p>
                <p className="mt-1 text-sm font-medium text-ink/70">{item.result}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/60">{item.summary}</p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-ink/40">
                  {item.client}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { BrainCircuit, ShieldCheck } from "lucide-react";
import Hero from "@/components/home/Hero";
import CompanyIntro from "@/components/home/CompanyIntro";
import StatsSection from "@/components/home/StatsSection";
import DivisionsGrid from "@/components/home/DivisionsGrid";
import AlternatingBlock from "@/components/home/AlternatingBlock";
import CaseStudies from "@/components/home/CaseStudies";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";
import EmailCapturePopup from "@/components/home/EmailCapturePopup";

export default function Home() {
  return (
    <>
      <EmailCapturePopup />
      <Hero />
      <CompanyIntro />
      {/* Lead with what we actually offer */}
      <DivisionsGrid />
      <AlternatingBlock
        icon={BrainCircuit}
        eyebrow="AI Capability"
        title="One AI layer, running across everything we build"
        description="Our in-house AI chat assistant and ML/BI engine isn't a separate product — it's woven into every service and product, so your teams get intelligence where they already work."
        points={[
          "Embedded AI chat assistant in every product",
          "Predictive analytics for budgets, delays & risk",
          "Automated site, financial & vendor reporting",
        ]}
        ctaHref="/services/ai-chatbot-virtual-assistant"
        ctaLabel="See AI in action"
      />
      <AlternatingBlock
        icon={ShieldCheck}
        eyebrow="Why Ebkan Tech"
        title="Built differently, on purpose"
        description="Four things that consistently show up in client feedback — and why teams stay with us long after launch."
        points={[
          "AI-first approach across every engagement",
          "Deep construction & EPC industry expertise",
          "End-to-end delivery, one accountable team",
          "Dedicated support that knows your systems",
        ]}
        ctaHref="/about"
        ctaLabel="More about us"
        reversed
      />
      {/* Proof: numbers, then stories, then voices */}
      <StatsSection />
      <CaseStudies />
      <Testimonials />
      <CTABanner />
    </>
  );
}

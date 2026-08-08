"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import ReadMore from "@/components/ui/ReadMore";

export default function Hero() {
  return (
    <section className="relative flex min-h-[650px] items-center overflow-hidden bg-[#0a0e1a]">
      {/* Base gradient — deep, cohesive navy */}
      <div
        className="absolute inset-0 bg-[linear-gradient(135deg,#0a0e1a_0%,#111a30_50%,#0a0e1a_100%)]"
        aria-hidden="true"
      />
      {/* Warm gold glow so the brand mark and headline lift off the dark */}
      <div
        className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_0%,rgba(204,152,54,0.20),transparent_70%)]"
        aria-hidden="true"
      />
      {/* Subtle diagonal texture */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 18px)",
        }}
        aria-hidden="true"
      />

      <Container className="relative py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-teal">
            AI-driven IT services &amp; products
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.15] text-white text-balance sm:text-5xl lg:text-[3.25rem]">
            IT Solutions Built for the Way You Work
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            Ebkan Tech pairs enterprise-grade IT services with purpose-built
            ERP and CRM products — infused with AI — so your teams spend less
            time wrangling systems and more time delivering results.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
            <ReadMore href="/products" onDark>
              Explore Products
            </ReadMore>
            <ReadMore href="/contact" onDark>
              Talk to Us
            </ReadMore>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

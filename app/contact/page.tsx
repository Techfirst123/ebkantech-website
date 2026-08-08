import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Ebkan Tech",
  description:
    "Talk to Ebkan Tech about IT services or products — book a demo, request a quote, or ask us anything.",
};

const INFO = [
  { icon: Mail, label: "Email", value: "sales@ebkantech.com" },
  { icon: Phone, label: "Phone", value: "+91 97178 15626" },
  { icon: MapPin, label: "Delivery", value: "Remote-first, global teams" },
  { icon: Clock, label: "Response time", value: "Within 1 business day" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about what you're building"
        description="Whether you need a quote, a demo, or just want to think through a problem — tell us a bit about it and we'll route you to the right person."
      />

      <section className="bg-white py-20 sm:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="bg-ink p-8 text-white">
              <h2 className="font-display text-lg font-semibold">Direct contact</h2>
              <ul className="mt-6 space-y-5">
                {INFO.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label} className="flex items-start gap-3.5">
                      <span className="flex size-9 shrink-0 items-center justify-center bg-white/10 text-teal">
                        <Icon className="size-4.5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-wide text-white/40">
                          {item.label}
                        </span>
                        <span className="block text-sm text-white/85">{item.value}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 border border-white/10 bg-white/5 p-4">
                <p className="text-xs leading-relaxed text-white/60">
                  Prefer to book time directly? Ask about our calendar link
                  when you submit the form, and we&apos;ll send one over with
                  your reply.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

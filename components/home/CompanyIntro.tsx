import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function CompanyIntro() {
return (
<section className="bg-ink py-20 sm:py-24">
<Container className="mx-auto max-w-3xl text-left">
<Reveal>
<h2 className="title-underline font-display text-3xl font-bold text-accent sm:text-4xl">
One team, two offerings, endless leverage
</h2>
<p className="mt-8 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
Ebkan Tech is an AI-driven IT company delivering both enterprise
services and ready-to-deploy products. We identify the systems
that slow operations down and replace them with software — and
engineering teams — built to move at the pace of the business.
</p>
</Reveal>
</Container>
</section>
);
}
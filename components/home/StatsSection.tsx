import Container from "@/components/ui/Container";
import StatCounter from "@/components/ui/StatCounter";

const STATS = [
  { target: 12, suffix: "+", label: "Years of delivery" },
  { target: 180, suffix: "+", label: "Projects shipped" },
  { target: 40, suffix: "+", label: "Enterprise clients" },
  { target: 99, suffix: "%", label: "Platform uptime" },
];

export default function StatsSection() {
  return (
    <section className="bg-ink pb-20 sm:pb-24">
      <Container>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </div>
      </Container>
    </section>
  );
}

/**
 * Auto-scrolling technology strip for the "Network & Cloud Security" card.
 * Pure CSS marquee (see .marquee-* rules in ebkan.css) — a linear infinite
 * transform loop is smoother and cheaper than animating this via JS/Framer,
 * and `animation-play-state: paused` on :hover gives the "pause to read"
 * behavior for free.
 */
const ROWS = [
  {
    id: "security",
    items: ["Cisco ASA/FTD", "Checkpoint", "PaloAlto", "F5 LTM", "Zscaler"],
    direction: "right", // scrolls left-to-right
    duration: 26,
  },
  {
    id: "cloud",
    items: ["Azure", "AWS", "Kubernetes", "Docker", "Terraform"],
    direction: "left", // scrolls right-to-left
    duration: 24,
  },
  {
    id: "devops",
    items: ["Splunk", "Microsoft Sentinel", "Azure DevOps", "Ansible", "Git"],
    direction: "right",
    duration: 28,
  },
];

function MarqueeRow({ items, direction, duration }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-row relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`marquee-track flex w-max gap-2.5 ${
          direction === "left" ? "scroll-rtl" : "scroll-ltr"
        }`}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((label, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full px-3.5 py-1.5 font-sans text-xs"
            style={{ background: "#ECEAE5", color: "#2A2A28" }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <div className="flex flex-col gap-2.5">
      {ROWS.map((row) => (
        <MarqueeRow key={row.id} items={row.items} direction={row.direction} duration={row.duration} />
      ))}
    </div>
  );
}

import { useState } from "react";

/**
 * Engagement models as flip cards: front = title, back = the detail.
 * Flips on hover with a mouse, on tap on touch screens (no hover there),
 * and on keyboard focus. With reduced motion it cross-fades instead of
 * rotating. Styles: vibrant.css (.fc).
 */
export const ENGAGEMENT_MODELS = [
  {
    code: "M-A",
    title: "Fixed-scope project",
    desc: "Defined deliverable — a model, dashboard, or ERP module — with milestones and a fixed price.",
    icon: <path d="M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />,
  },
  {
    code: "M-B",
    title: "Data science retainer",
    desc: "An ongoing analytics partner that keeps models accurate and reporting fresh.",
    icon: <path d="M3 3v18h18M7 15l4-4 3 3 6-7" />,
  },
  {
    code: "M-C",
    title: "ERP / CRM implementation",
    desc: "End-to-end rollout — configuration, data migration, training, and go-live support.",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
  },
  {
    code: "M-D",
    title: "Managed support & AMC",
    desc: "We run and evolve your platform under a support agreement so your team can focus elsewhere.",
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4" />,
  },
];

function FlipCard({ m }) {
  const [flipped, setFlipped] = useState(false);
  return (
    // The tap toggle only has a visual effect on touch screens (see vibrant.css);
    // with a mouse the card flips on hover. Screen readers get both sides.
    <button
      type="button"
      className={"fc" + (flipped ? " is-flipped" : "")}
      aria-label={`${m.title}: ${m.desc}`}
      onClick={() => setFlipped((f) => !f)}
    >
      <span className="fc-inner" aria-hidden="true">
        <span className="fc-face fc-front">
          <span className="fc-code mono">{m.code}</span>
          <svg className="fc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
            strokeLinecap="round" strokeLinejoin="round">
            {m.icon}
          </svg>
          <span className="fc-title">{m.title}</span>
          <span className="fc-hint mono">Hover or tap ↻</span>
        </span>
        <span className="fc-face fc-back">
          <span className="fc-title">{m.title}</span>
          <span className="fc-desc">{m.desc}</span>
        </span>
      </span>
    </button>
  );
}

export default function FlipCards({ items = ENGAGEMENT_MODELS }) {
  return (
    <div className="fc-grid">
      {items.map((m) => <FlipCard key={m.code} m={m} />)}
    </div>
  );
}

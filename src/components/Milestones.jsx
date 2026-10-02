import { useEffect, useRef } from "react";
import { gsap, reducedMotion, ScrollTrigger, whenBooted } from "../motion";
import CountUp from "./CountUp";

/**
 * Hero milestones row.
 *   Layout: Bootstrap 5 grid (row / row-cols / g-3) — scoped to the .bs
 *           wrapper, see src/vendor/bootstrap-grid.scoped.css.
 *   Motion: GSAP — once the loading screen is gone, the cards rise in with
 *           a stagger, their accent bars fill, icons pop, numbers count up.
 * Content is visible without JavaScript/animation; GSAP only hides it the
 * moment it's about to animate it. Styles: vibrant.css (.ms).
 */

const ICONS = {
  areas: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  erp: <path d="M20 6 9 17l-5-5" />,
  industries: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  flow: <path d="M4 17h4l3-10 3 10h6M17 14l3 3-3 3" />,
};

export const MILESTONES = [
  { value: "9", label: "Solution areas", sub: "From analytics and AI to ERP", icon: "areas" },
  { value: "15", label: "ERP verticals delivered", sub: "Built and handed over", icon: "erp" },
  { value: "20+", label: "Industries served", sub: "Supply chain to solar EPC", icon: "industries" },
  { value: "End-to-end", label: "Data to dashboard", sub: "Strategy → build → support", icon: "flow" },
];

export default function Milestones() {
  const ref = useRef(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const root = ref.current;
    const cards = root.querySelectorAll(".ms-card");
    const bars = root.querySelectorAll(".ms-bar-fill");
    const icons = root.querySelectorAll(".ms-icon");
    let st;
    let tl;
    let cancelled = false;

    // hide only what GSAP is about to animate
    gsap.set(cards, { autoAlpha: 0, y: 28 });
    gsap.set(bars, { scaleX: 0 });
    gsap.set(icons, { scale: 0.6, rotation: -12 });

    whenBooted().then(() => {
      if (cancelled) return;
      tl = gsap
        .timeline({ paused: true })
        .to(cards, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12 })
        .to(icons, { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(2)", stagger: 0.12 }, "-=0.55")
        .to(bars, { scaleX: 1, duration: 0.9, ease: "power2.inOut", stagger: 0.12 }, "-=0.6");
      st = ScrollTrigger.create({
        trigger: root,
        start: "top bottom", // any part on screen (it sits low in the pinned hero)
        once: true,
        onEnter: () => tl.play(),
      });
    });

    return () => {
      cancelled = true;
      st?.kill();
      tl?.kill();
      gsap.set([cards, bars, icons], { clearProps: "all" });
    };
  }, []);

  return (
    <div className="bs ms" ref={ref}>
      <div className="row g-3 row-cols-2 row-cols-lg-4">
        {MILESTONES.map((m) => (
          <div className="col" key={m.label}>
            <div className="ms-card">
              <span className="ms-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round">
                  {ICONS[m.icon]}
                </svg>
              </span>
              <div className="ms-value">{/^\d/.test(m.value) ? <CountUp value={m.value} /> : m.value}</div>
              <div className="ms-label mono">{m.label}</div>
              <div className="ms-sub">{m.sub}</div>
              <span className="ms-bar" aria-hidden="true">
                <span className="ms-bar-fill" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

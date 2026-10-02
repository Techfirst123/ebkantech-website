import { useEffect, useRef } from "react";
import { gsap, reducedMotion, ScrollTrigger, whenBooted } from "../motion";

/**
 * "Technology" section.
 *   Layout: Bootstrap 5 grid, scoped to .bs (src/vendor/bootstrap-grid.scoped.css)
 *   Motion: GSAP — cards rise in with a stagger, then their chips pop in.
 *
 * Content rule: list only what Ebkan Tech actually uses or builds.
 * Our ERP/CRM products are in development, and are labelled that way.
 * Styles: vibrant.css (.tk).
 */

const ICONS = {
  ml: <path d="M12 3v3m0 12v3M3 12h3m12 0h3M6 6l2 2m8 8 2 2M18 6l-2 2m-8 8-2 2M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />,
  bi: <path d="M3 3v18h18M8 17V11m4 6V7m4 10v-4" />,
  products: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  cloud: <path d="M7 18a5 5 0 0 1-.9-9.9A6 6 0 0 1 17.6 9 4.5 4.5 0 0 1 17 18H7Z" />,
};

export const TECH = [
  {
    key: "ml",
    title: "Data Science & ML",
    items: ["Python", "pandas / NumPy", "scikit-learn", "XGBoost", "TensorFlow / PyTorch", "Prophet"],
  },
  {
    key: "bi",
    title: "Analytics & BI",
    items: ["Power BI", "Tableau", "SQL", "Snowflake", "Apache Airflow"],
  },
  {
    key: "products",
    title: "Our ERP & CRM",
    featured: true,
    // our own products — only names and what each is for
    products: [
      { name: "ERP Saurya 2x", for: "Power & solar" },
      { name: "ERP Niraman 2x", for: "Infrastructure projects" },
      { name: "Vantage 2x", for: "Rental CRM" },
      { name: "Lead2x", for: "Sales CRM" },
    ],
  },
  {
    key: "cloud",
    title: "Cloud & DevOps",
    note: "Cloud services for the GCC region",
    items: ["Cloudflare", "Microsoft Azure", "Docker"],
  },
];

export default function TechStack() {
  const ref = useRef(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const root = ref.current;
    const cards = root.querySelectorAll(".tk-card");
    const chips = root.querySelectorAll(".tk-chip, .tk-prod");
    let st;
    let cancelled = false;
    gsap.set(cards, { autoAlpha: 0, y: 30 });
    gsap.set(chips, { autoAlpha: 0, scale: 0.85 });

    whenBooted().then(() => {
      if (cancelled) return;
      const tl = gsap
        .timeline({ paused: true })
        .to(cards, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1 })
        .to(chips, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(2)", stagger: 0.03 }, "-=0.45");
      st = ScrollTrigger.create({
        trigger: root,
        start: "top 80%",
        once: true,
        onEnter: () => tl.play(),
      });
    });
    return () => {
      cancelled = true;
      st?.kill();
      gsap.set([cards, chips], { clearProps: "all" });
    };
  }, []);

  return (
    <div className="bs tk" ref={ref}>
      <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-xl-4">
        {TECH.map((g) => (
          <div className="col" key={g.key}>
            <article className={"tk-card" + (g.featured ? " is-featured" : "")}>
              <header className="tk-head">
                <span className="tk-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round">
                    {ICONS[g.key]}
                  </svg>
                </span>
                <div>
                  <h3 className="tk-title">{g.title}</h3>
                  <span className="tk-count mono">
                    {g.products ? `${g.products.length} products` : `${g.items.length} tools`}
                  </span>
                </div>
              </header>

              {g.note && <p className="tk-note mono">{g.note}</p>}

              {g.products ? (
                <ul className="tk-prods">
                  {g.products.map((p) => (
                    <li className="tk-prod" key={p.name}>
                      <span className="tk-prod-name">{p.name}</span>
                      <span className="tk-prod-for">{p.for}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="tk-chips">
                  {g.items.map((t) => (
                    <li className="tk-chip" key={t}>
                      <span className="tk-mono" aria-hidden="true">
                        {t.replace(/[^A-Za-z]/g, "").slice(0, 1)}
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              )}

              {g.featured && (
                <p className="tk-status mono">
                  <span className="tk-status-dot" aria-hidden="true" />
                  In development
                </p>
              )}
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}

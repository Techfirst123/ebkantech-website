import { Link } from "react-router-dom";
import { SCOPE } from "../data/scope";
import { productsIn } from "../data/demoShowcase";

/**
 * Home-page "Scope of business" cards. Each card is a link to that
 * category's own page (/services/<slug>), which lists its services and
 * demo products. Colour comes from the category's `accent` (data/scope.jsx).
 * Styles: category.css (cc- classes).
 */

const PREVIEW_SERVICES = 3;

export function CategoryIcon({ icon, className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icon}
    </svg>
  );
}

export default function CategoryCards() {
  return (
    <div className="cc-grid">
      {SCOPE.map((c) => {
        const services = c.items.length;
        const demos = productsIn(c.cat).length;
        const extra = services - PREVIEW_SERVICES;
        return (
          <Link key={c.slug} to={`/services/${c.slug}`} className="cc" style={{ "--c-accent": c.accent }}>
            <CategoryIcon icon={c.icon} className="cc-watermark" />

            <div className="cc-top">
              <span className="cc-icon">
                <CategoryIcon icon={c.icon} />
              </span>
              <span className="cc-counts mono">
                <span>{services} {services === 1 ? "service" : "services"}</span>
                {demos > 0 && (
                  <span className="cc-demos">
                    <span className="cc-demos-dot" aria-hidden="true" />
                    {demos} {demos === 1 ? "demo" : "demos"}
                  </span>
                )}
              </span>
            </div>

            <h3 className="cc-name">{c.cat}</h3>
            <p className="cc-sub">{c.sub}</p>

            <ul className="cc-list">
              {c.items.slice(0, PREVIEW_SERVICES).map((it) => (
                <li key={it.code}>{it.title}</li>
              ))}
              {extra > 0 && <li className="cc-more">+{extra} more</li>}
            </ul>

            <span className="cc-go">
              Explore {c.cat}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

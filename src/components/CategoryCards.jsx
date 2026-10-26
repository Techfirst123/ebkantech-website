import { Link } from "react-router-dom";
import { SCOPE } from "../data/scope";
import { productsIn } from "../data/demoShowcase";

/**
 * Home-page "Scope of business" cards. Each card is a link to that
 * category's own page (/services/<slug>), which lists its services and
 * demo products. Colour comes from the category's `accent` (data/scope.jsx).
 * Styles: category.css (cc- classes).
 */

export function CategoryIcon({ icon, className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icon}
    </svg>
  );
}

/**
 * One horizontal row of compact category cards that drifts right → left,
 * looping forever. Layout uses Bootstrap 5 flex utilities (scoped to .bs —
 * src/vendor/bootstrap-grid.scoped.css); the movement is a CSS animation.
 *
 * - The list is rendered twice; the track moves by exactly half its width,
 *   so the loop is seamless. The copy is hidden from screen readers and
 *   keyboard focus, so every category is announced once.
 * - Pauses on hover and while a card has keyboard focus.
 * - Reduced motion: no animation — the row becomes a swipeable strip.
 * Styles: category.css (.scope-marquee, .sc-).
 */
function ScopeCard({ c, copy }) {
  const services = c.items.length;
  const demos = productsIn(c.cat).length;
  return (
    <Link
      to={`/services/${c.slug}`}
      className="sc flex-shrink-0 d-flex flex-column"
      style={{ "--c-accent": c.accent }}
      {...(copy ? { tabIndex: -1, "aria-hidden": true } : {})}
    >
      <span className="sc-top d-flex align-items-center">
        <span className="sc-icon flex-shrink-0">
          <CategoryIcon icon={c.icon} />
        </span>
        <span className="sc-name">{c.cat}</span>
      </span>
      <span className="sc-sub">{c.sub}</span>
      <span className="sc-meta mono d-flex align-items-center justify-content-between">
        <span>
          {services} {services === 1 ? "service" : "services"}
          {demos > 0 && ` · ${demos} ${demos === 1 ? "demo" : "demos"}`}
        </span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

export default function CategoryCards() {
  return (
    <div className="bs scope-marquee" role="region" aria-label="Scope of business — service categories">
      <div className="sc-track d-flex flex-nowrap align-items-stretch">
        {SCOPE.map((c) => (
          <ScopeCard key={c.slug} c={c} />
        ))}
        {SCOPE.map((c) => (
          <ScopeCard key={`${c.slug}-copy`} c={c} copy />
        ))}
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { ArrowUp, ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { SITE } from "../data/site";
import { SCOPE } from "../data/scope";
import { WHATSAPP } from "../data/contact";

/**
 * Site footer — shared by every page. Dark, full-width, in three tiers:
 *   1. a closing call-to-action band (hidden where the page already ends in
 *      one — the home page's contact form, the product pages' demo band)
 *   2. brand + contact details, and four link columns
 *   3. a legal bar
 * Links without a real destination yet (LinkedIn, Careers, booking) stay
 * hidden until their value is filled in data/site.js, so nothing points
 * nowhere. Styles: ebkan.css (.sf-foot).
 */

const PRODUCTS = [
  ["Saurya2x — Solar EPC ERP", "/products/saurya-2x"],
  ["VantageRental5x", "/products/vantage-rental-5x"],
  ["10x Compliance", "/products/compliance-10x"],
  ["Warehouse Management ERP", "/products/warehouse-erp"],
  ["Field Service ERP", "/products/field-service-erp"],
];

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
      />
    </svg>
  );
}

export default function SiteFooter({ cta = true }) {
  const linkedin = SITE.sameAs.find((u) => /linkedin\.com/i.test(u));
  const tel = SITE.phone ? `tel:${SITE.phone.replace(/[^\d+]/g, "")}` : "";
  const wa = WHATSAPP.number
    ? `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(WHATSAPP.message)}`
    : "";
  const year = 2026;

  return (
    <footer className="sf-foot">
      {cta && (
        <div className="wrap">
          <div className="sf-foot-cta">
            <div>
              <span className="sf-foot-eyebrow">Saurya2x · Solar EPC ERP</span>
              <h2>See Saurya2x running on your own project.</h2>
              <p>
                Send us one project&apos;s BOQ and vendor list — in a 30-minute live demo, we&apos;ll
                show you your own dashboard.
              </p>
            </div>
            <div className="sf-foot-cta-btns">
              <Link to="/?interest=saurya-2x#contact" className="sf-btn">
                Book a live demo <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              {wa && (
                <a href={wa} className="sf-btn sf-btn-ghost" target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={16} aria-hidden="true" /> WhatsApp us
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="wrap">
        <div className="sf-foot-main">
          <div className="sf-foot-brand">
            <Link className="sf-foot-logo" to="/">
              <img src="/ebkan-tech-logo.png" alt="" width="36" height="36" />
              <span>
                Ebkan Tech
                <small>{SITE.tagline}</small>
              </span>
            </Link>
            <p>
              Industry ERP products and data science for solar EPC, infrastructure, real estate and
              logistics teams — built by people who know these operations from the inside.
            </p>
            <ul className="sf-foot-contact">
              <li>
                <Mail size={16} aria-hidden="true" />
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              {tel && (
                <li>
                  <Phone size={16} aria-hidden="true" />
                  <a href={tel}>{SITE.phone}</a>
                </li>
              )}
              {wa && (
                <li>
                  <MessageCircle size={16} aria-hidden="true" />
                  <a href={wa} target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp
                  </a>
                </li>
              )}
            </ul>
            {linkedin && (
              <div className="sf-foot-social">
                <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="Ebkan Tech on LinkedIn">
                  <LinkedInIcon />
                </a>
              </div>
            )}
          </div>

          <nav className="sf-foot-col" aria-label="Products">
            <h3>Products</h3>
            {PRODUCTS.map(([label, to]) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
          </nav>

          <nav className="sf-foot-col" aria-label="Services">
            <h3>Services</h3>
            {SCOPE.map((c) => (
              <Link key={c.slug} to={`/services/${c.slug}`}>
                {c.cat}
              </Link>
            ))}
          </nav>

          <nav className="sf-foot-col" aria-label="Company">
            <h3>Company</h3>
            <Link to="/#about">About us</Link>
            <Link to="/#process">How we work</Link>
            <Link to="/#industries">Industries</Link>
            {SITE.careersEmail && <a href={`mailto:${SITE.careersEmail}?subject=Careers`}>Careers</a>}
            <Link to="/#contact">Contact</Link>
          </nav>

          <nav className="sf-foot-col" aria-label="Resources">
            <h3>Resources</h3>
            <Link to="/products/saurya-2x#faq">Saurya2x FAQ</Link>
            <Link to="/products/saurya-2x#security">Security &amp; data</Link>
            {SITE.bookingUrl && (
              <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer">
                Book a meeting
              </a>
            )}
            <Link to="/privacy">Privacy policy</Link>
          </nav>
        </div>

        <div className="sf-foot-legal">
          <span>© {year} Ebkan Tech Pvt Ltd. All rights reserved.</span>
          <span className="sf-foot-legal-links">
            <Link to="/privacy">Privacy policy</Link>
            <button
              type="button"
              className="sf-foot-top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Back to top <ArrowUp size={14} aria-hidden="true" />
            </button>
          </span>
        </div>
      </div>
    </footer>
  );
}

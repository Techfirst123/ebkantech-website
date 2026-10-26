import { Link } from "react-router-dom";
import { SITE } from "../data/site";

/**
 * Site footer — shared by the home page and the product/category pages.
 * Links that have no real destination yet (LinkedIn, Careers) stay hidden
 * until their value is filled in data/site.js, so nothing points nowhere.
 */
export default function SiteFooter() {
  const linkedin = SITE.sameAs.find((u) => /linkedin\.com/i.test(u));
  const tel = SITE.phone ? `tel:${SITE.phone.replace(/[^\d+]/g, "")}` : "";
  const year = 2026;

  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div className="foot-brand">
            <Link className="brand" to="/">
              <img className="mark" src="/ebkan-tech-logo.png" alt="Ebkan Tech logo" />
              <span className="title">Ebkan Tech</span>
            </Link>
            <p>
              Industry ERP products and data science for solar EPC, infrastructure,
              real estate and logistics. {SITE.tagline}.
            </p>
          </div>
          <div className="col">
            <h6>Products</h6>
            <Link to="/products/saurya-2x">Saurya2x — Solar EPC ERP</Link>
            <Link to="/products/vantage-rental-5x">VantageRental5x</Link>
            <Link to="/products/compliance-10x">10x Compliance</Link>
            <Link to="/products/warehouse-erp">Warehouse ERP</Link>
            <Link to="/products/field-service-erp">Field Service ERP</Link>
          </div>
          <div className="col">
            <h6>Company</h6>
            <Link to="/#about">About us</Link>
            <Link to="/#scope">Services</Link>
            <Link to="/#process">How we work</Link>
            <Link to="/#industries">Industries</Link>
            <Link to="/#contact">Contact</Link>
          </div>
          <div className="col">
            <h6>Connect</h6>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            {tel && <a href={tel}>{SITE.phone}</a>}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
            {SITE.careersEmail && <a href={`mailto:${SITE.careersEmail}?subject=Careers`}>Careers</a>}
          </div>
        </div>
        <div className="legal">
          <span>© {year} Ebkan Tech Pvt Ltd</span>
          <span>
            <Link to="/privacy">Privacy policy</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

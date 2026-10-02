import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PRODUCTS, featuredFirst, hasDemo } from "../data/demoShowcase";
import { ModulePreview } from "../components/ProductDemos";
import TopBar from "../components/TopBar";

/**
 * /products/<id> — one page per product: what it is, its tabbed module
 * preview (sample data), the HTML demo once one is seeded, and the product
 * brochure PDF. Content comes from components/ProductDemos.jsx (modules)
 * and data/demoShowcase.js (category, demo, brochure).
 * Styles: reuses the category-page classes in category.css (cp-).
 */

const initials = (name) =>
  name
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

function NotFound() {
  return (
    <>
      <TopBar />
      <main className="cp">
        <div className="wrap cp-missing">
          <p className="eyebrow">Not found</p>
          <h1 className="cp-title">That product doesn&apos;t exist.</h1>
          <Link to="/#products" className="btn">
            See all products
          </Link>
        </div>
      </main>
    </>
  );
}

export default function ProductPage() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);

  useEffect(() => {
    if (!product) return;
    const prev = document.title;
    document.title = `${product.name} — Product demo | Ebkan Tech`;
    window.scrollTo(0, 0);
    return () => {
      document.title = prev;
    };
  }, [product]);

  if (!product) return <NotFound />;

  const live = hasDemo(product);
  const others = featuredFirst(PRODUCTS).filter((p) => p.id !== product.id);

  return (
    <>
      <TopBar />
      <main className="cp" style={{ "--c-accent": product.accent }}>
        <section className="cp-hero">
          <div className="wrap">
            <nav className="cp-crumb mono" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link to="/#products">Products</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{product.name}</span>
            </nav>
            <div className="cp-head">
              <span className="cp-icon pp-mono" aria-hidden="true">
                {initials(product.name)}
              </span>
              <div>
                <p className="eyebrow">
                  {product.category} · {product.industry}
                </p>
                <h1 className="cp-title">{product.name}</h1>
                <p className="cp-sub">{product.blurb}</p>
                <div className="pp-actions">
                  {live && (
                    <a className="btn" href={product.demo} target="_blank" rel="noopener noreferrer">
                      Open live demo ↗
                    </a>
                  )}
                  {product.brochure && (
                    <a className={"btn" + (live ? " ghost" : "")} href={product.brochure} target="_blank" rel="noopener noreferrer">
                      Product brochure (PDF) ↗
                    </a>
                  )}
                  <Link to="/#contact" className="btn ghost">
                    Book a live walkthrough
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cp-section">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <span className="eyebrow">Inside the product</span>
                <h2>
                  Walk through <span className="hl">{product.name}</span>
                </h2>
              </div>
              <p>
                {product.modules.length} modules — click through the same
                screens your team would use, filled with sample data.
              </p>
            </div>
            <ModulePreview project={product} />
          </div>
        </section>

        <section className="cp-section">
          <div className="wrap">
            <span className="eyebrow">Other products</span>
            <div className="cp-others">
              {others.map((p) => (
                <Link key={p.id} to={`/products/${p.id}`} className="cp-other" style={{ "--c-accent": p.accent }}>
                  <span className="cc-icon cc-icon-sm pp-mono" aria-hidden="true">
                    {initials(p.name)}
                  </span>
                  <span className="cp-other-name">{p.name}</span>
                  <span className="cp-other-go" aria-hidden="true">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="cp-section">
          <div className="wrap">
            <div className="cp-cta">
              <div>
                <h2>See {product.name} on your own data</h2>
                <p>Book a 30-minute walkthrough — we&apos;ll show you your own dashboard.</p>
              </div>
              <Link to="/#contact" className="btn">
                Start a conversation
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

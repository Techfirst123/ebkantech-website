import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { SCOPE, getCategory } from "../data/scope";
import { hasDemo, productsIn } from "../data/demoShowcase";
import { ProductGrid } from "../components/DemoShowcase";
import { CategoryIcon } from "../components/CategoryCards";
import TopBar from "../components/TopBar";

/**
 * /services/<slug> — one page per Scope-of-business category: its services
 * (the sub-category cards that used to sit under the home-page tabs) and its
 * demo products. Content comes from data/scope.jsx and data/demoShowcase.js.
 * Styles: category.css (cp- classes) + the existing .cap service cards.
 */

function NotFound() {
  return (
    <>
      <TopBar />
      <main className="cp">
        <div className="wrap cp-missing">
          <p className="eyebrow">Not found</p>
          <h1 className="cp-title">That service category doesn&apos;t exist.</h1>
          <Link to="/#scope" className="btn">
            See all services
          </Link>
        </div>
      </main>
    </>
  );
}

export default function CategoryPage() {
  const { slug } = useParams();
  const cat = getCategory(slug);

  useEffect(() => {
    if (!cat) return;
    const prev = document.title;
    document.title = `${cat.cat} — Services & Demos | Ebkan Tech`;
    window.scrollTo(0, 0);
    return () => {
      document.title = prev;
    };
  }, [cat]);

  if (!cat) return <NotFound />;

  const products = productsIn(cat.cat);
  const liveCount = products.filter(hasDemo).length;
  const others = SCOPE.filter((c) => c.slug !== cat.slug);

  return (
    <>
      <TopBar />
      <main className="cp" style={{ "--c-accent": cat.accent }}>
        {/* header band */}
        <section className="cp-hero">
          <div className="wrap">
            <nav className="cp-crumb mono" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link to="/#scope">Services</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{cat.cat}</span>
            </nav>
            <div className="cp-head">
              <span className="cp-icon">
                <CategoryIcon icon={cat.icon} />
              </span>
              <div>
                <p className="eyebrow">Scope of business</p>
                <h1 className="cp-title">{cat.cat}</h1>
                <p className="cp-sub">{cat.sub}</p>
                <div className="cp-stats mono">
                  <span>
                    {cat.items.length} {cat.items.length === 1 ? "service" : "services"}
                  </span>
                  <span>
                    {products.length === 0
                      ? "Demos on request"
                      : `${products.length} demo ${products.length === 1 ? "product" : "products"}`}
                  </span>
                  {liveCount > 0 && <span className="cp-live">{liveCount} with HTML demo</span>}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* services (sub-categories) */}
        <section className="cp-section">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <span className="eyebrow">What we deliver</span>
                <h2>{cat.cat} services</h2>
              </div>
            </div>
            <div className="cap-grid">
              {cat.items.map((it) => (
                <article className="cap" key={it.code}>
                  {it.badge && <span className="badge">{it.badge}</span>}
                  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    {it.icon}
                  </svg>
                  <div className="code">{it.code}</div>
                  <h3>{it.title}</h3>
                  <p>{it.desc}</p>
                  <ul>
                    {it.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* demo products */}
        <section className="cp-section cp-demos">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <span className="eyebrow">Demo products</span>
                <h2>
                  {products.length > 0
                    ? `See ${cat.cat} in action`
                    : `${cat.cat} demos are shown on request`}
                </h2>
              </div>
              {products.length > 0 && (
                <p>
                  {liveCount > 0
                    ? "Products marked HTML demo open a full working demo. Every product has its own page with a module preview filled with clearly-labelled sample data."
                    : "Open any product to click through its modules, filled with clearly-labelled sample data, and download its brochure."}
                </p>
              )}
            </div>
            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="cd-empty">
                <p>
                  We don&apos;t have a public {cat.cat} demo yet. We run private
                  walkthroughs on your own data instead — tell us the problem and
                  we&apos;ll show you how it would look.
                </p>
                <Link to="/#contact" className="btn">
                  Request a private walkthrough
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* other categories */}
        <section className="cp-section">
          <div className="wrap">
            <span className="eyebrow">More from Ebkan Tech</span>
            <div className="cp-others">
              {others.map((c) => (
                <Link key={c.slug} to={`/services/${c.slug}`} className="cp-other" style={{ "--c-accent": c.accent }}>
                  <span className="cc-icon cc-icon-sm">
                    <CategoryIcon icon={c.icon} />
                  </span>
                  <span className="cp-other-name">{c.cat}</span>
                  <span className="cp-other-go" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* contact band */}
        <section className="cp-section">
          <div className="wrap">
            <div className="cp-cta">
              <div>
                <h2>Need {cat.cat} for your business?</h2>
                <p>Tell us the problem — we&apos;ll reply with an approach and a rough timeline.</p>
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

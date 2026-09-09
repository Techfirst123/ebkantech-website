import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PROJECTS, getProject } from "../data/projects";
import { DashboardShell } from "../components/dashboard/Dashboard";
import { trackEvent } from "../analytics";

/**
 * Per-product page — one real URL per platform, so each can rank for its
 * own search intent instead of six products competing for one homepage.
 *
 * The <head> for these routes is written at build time by
 * scripts/prerender.mjs from the same project record; the useEffect here
 * only covers client-side navigation, where the prerendered head is
 * already in place from whichever page the visitor landed on first.
 */

function NotFound() {
  return (
    <main className="pp-wrap">
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1 className="pp-title">That product doesn&apos;t exist.</h1>
        <p className="pp-intro">
          It may have been renamed. Here&apos;s everything we currently have in build.
        </p>
        <div className="pp-other-grid">
          {PROJECTS.map((p) => (
            <Link key={p.slug} to={`/products/${p.slug}`} className="pp-other">
              <span className="mono pp-other-industry">{p.industry}</span>
              <span className="pp-other-name">{p.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function ProductPage() {
  const { slug } = useParams();
  const project = getProject(slug);

  useEffect(() => {
    if (!project) return;
    document.title = project.seo.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", project.seo.description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", `https://ebkantech.com/products/${project.slug}`);
    }
    window.scrollTo(0, 0);
  }, [project]);

  if (!project) return <NotFound />;

  const others = PROJECTS.filter((p) => p.slug !== project.slug);

  return (
    <main className="pp-wrap" style={{ "--p-accent": project.accent }}>
      <div className="wrap">
        <nav className="pp-crumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/#demos">Products</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.name}</span>
        </nav>

        <header className="pp-head">
          <p className="eyebrow">{project.industry}</p>
          <h1 className="pp-title">{project.name}</h1>
          <p className="pp-lead">{project.blurb}</p>
          <p className="pp-intro">{project.intro}</p>
          <a
            href="#product-enquiry"
            className="demo-cta"
            onClick={() =>
              trackEvent("select_content", {
                content_type: "product_page_cta",
                item_id: project.slug,
                item_name: project.name,
              })
            }
          >
            Talk to us about this platform
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </header>

        <section className="pp-section" aria-label="Live dashboard demo">
          <DashboardShell project={project} />
          <p className="demo-disclaimer mono">Sample data shown for demonstration only.</p>
        </section>

        <section className="pp-section">
          <h2 className="pp-h2">What&apos;s inside</h2>
          <div className="pp-modules">
            {project.modules.map(([name, desc]) => (
              <div className="pp-module" key={name}>
                <h3>{name}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pp-section pp-enquiry" id="product-enquiry">
          <h2 className="pp-h2">Run an operation like this?</h2>
          <p className="pp-intro">
            We build these around how a business already works, not the other way round.
            Tell us what your current process looks like and we&apos;ll show you what
            changes.
          </p>
          <div className="demo-actions">
            <Link to="/#contact" className="demo-cta">
              Start a conversation
            </Link>
            <a href="mailto:sales@ebkantech.com" className="demo-cta ghost">
              sales@ebkantech.com
            </a>
          </div>
        </section>

        <section className="pp-section">
          <h2 className="pp-h2">Other platforms</h2>
          <div className="pp-other-grid">
            {others.map((p) => (
              <Link
                key={p.slug}
                to={`/products/${p.slug}`}
                className="pp-other"
                style={{ "--p-accent": p.accent }}
              >
                <span className="mono pp-other-industry">{p.industry}</span>
                <span className="pp-other-name">{p.name}</span>
                <span className="pp-other-blurb">{p.blurb}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

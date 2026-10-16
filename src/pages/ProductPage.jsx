import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { PRODUCTS, featuredFirst, hasDemo, hasVideo } from "../data/demoShowcase";
import { ModulePreview } from "../components/ProductDemos";
import VideoModal from "../components/VideoModal";
import TiltPanel from "../components/TiltPanel";
import TopBar from "../components/TopBar";

/**
 * /products/<id> — one page per product.
 *
 * Structure: a dark "instrument panel" hero over a light body. The hero's
 * panel is the product itself — its overview video if one is seeded,
 * otherwise its live KPI readout — tilted in 3D toward the pointer
 * (components/TiltPanel.jsx). Everything below the hero is kept flat and
 * quiet so the panel stays the one loud thing on the page.
 *
 * Content: components/ProductDemos.jsx (modules, KPIs) and
 * data/demoShowcase.js (category, demo, video). Each product re-skins the
 * page through --c-accent.
 * Layout: Bootstrap 5 grid scoped to .bs (src/vendor/bootstrap-grid.scoped.css)
 * Styles: src/product.css
 */

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

/* One orchestrated reveal on load, rather than an effect on every section. */
const rise = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.06 * i },
  }),
};

export default function ProductPage() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);
  const [videoOpen, setVideoOpen] = useState(false);

  // <head> (title, description, canonical, structured data) is set by useSeo
  useEffect(() => {
    if (product) window.scrollTo(0, 0);
  }, [product]);

  // Never leave the player open when moving to another product.
  useEffect(() => setVideoOpen(false), [id]);

  if (!product) return <NotFound />;

  const live = hasDemo(product);
  const video = hasVideo(product) ? product.video : null;
  const others = featuredFirst(PRODUCTS).filter((p) => p.id !== product.id);
  const kpis = (product.kpis || []).slice(0, 4);

  return (
    <>
      <TopBar />
      <main className="pp" style={{ "--c-accent": product.accent }}>
        {/* ---------------- HERO ---------------- */}
        <section className="pp-hero">
          <div className="wrap bs">
            <nav className="pp-crumb mono" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link to="/#products">Products</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{product.name}</span>
            </nav>

            <div className="row pp-hero-grid g-4 g-lg-5">
              <div className="col-12 col-lg-6">
                <motion.span
                  className="pp-tag"
                  variants={rise}
                  initial="hidden"
                  animate="show"
                  custom={0}
                >
                  <span className="pp-dot" aria-hidden="true" />
                  <b>{product.category}</b>
                  <span>{product.industry}</span>
                </motion.span>

                <motion.h1
                  className="pp-name"
                  variants={rise}
                  initial="hidden"
                  animate="show"
                  custom={1}
                >
                  {product.name}
                </motion.h1>

                <motion.p
                  className="pp-blurb"
                  variants={rise}
                  initial="hidden"
                  animate="show"
                  custom={2}
                >
                  {product.blurb}
                </motion.p>

                <motion.div
                  className="pp-actions"
                  variants={rise}
                  initial="hidden"
                  animate="show"
                  custom={3}
                >
                  {video && (
                    <button type="button" className="pp-btn" onClick={() => setVideoOpen(true)}>
                      <span className="pp-play-ico" aria-hidden="true">
                        ▶
                      </span>
                      Watch demo video
                      <span className="pp-play-len" aria-hidden="true">
                        {video.duration}
                      </span>
                    </button>
                  )}
                  {live && (
                    <a
                      className={"pp-btn" + (video ? " pp-btn-ghost" : "")}
                      href={product.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open live demo
                    </a>
                  )}
                  <Link to="/#contact" className="pp-btn pp-btn-ghost">
                    Book a live walkthrough
                  </Link>
                </motion.div>
              </div>

              <div className="col-12 col-lg-6">
                <div className="pp-stage">
                  <TiltPanel
                    className="pp-panel"
                    {...(video
                      ? {
                          role: "button",
                          tabIndex: 0,
                          onClick: () => setVideoOpen(true),
                          onKeyDown: (e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setVideoOpen(true);
                            }
                          },
                          "aria-label": `Play video: ${video.title}`,
                        }
                      : {})}
                  >
                    <div className="pp-chrome" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                      <span className="mono">
                        {video ? `${product.name} — overview` : `${product.name} — live dashboard`}
                      </span>
                    </div>

                    {video ? (
                      <span className="pp-shot">
                        <img src={video.poster} alt="" width="1280" height="720" />
                        <span className="pp-shot-veil" aria-hidden="true" />
                        <span className="pp-shot-cap">
                          <b>{video.title}</b>
                          <span className="mono">{video.duration}</span>
                        </span>
                        <span className="pp-shot-play" aria-hidden="true">
                          ▶
                        </span>
                      </span>
                    ) : (
                      <div className="pp-readout">
                        {kpis.map((k) => (
                          <div key={k.lbl}>
                            <div className="v">{k.val}</div>
                            <div className="l">{k.lbl}</div>
                            <div className="s">{k.sub}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TiltPanel>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- BODY ---------------- */}
        <div className="pp-body">
          <section className="pp-sec">
            <div className="wrap bs">
              <h2 className="pp-h2">What it covers</h2>
              <p className="pp-lead">
                {product.modules.length} working areas, each with its own screens and
                sample data.
              </p>
              <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-lg-3">
                {product.modules.map((m) => (
                  <div className="col" key={m.name}>
                    <div className="pp-mod">
                      <span className="pp-mod-kind mono">{moduleKind(m)}</span>
                      <h3>{m.name}</h3>
                      <p>{moduleLine(m)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="pp-sec">
            <div className="wrap">
              <h2 className="pp-h2">Click through it</h2>
              <p className="pp-lead">
                The same screens your team would use, filled with clearly-labelled
                sample data.
              </p>
              <ModulePreview project={product} />
            </div>
          </section>

          <section className="pp-sec">
            <div className="wrap">
              <h2 className="pp-h2">Other products</h2>
              <p className="pp-lead">Built the same way, for a different operation.</p>
              <div className="pp-others">
                {others.map((p) => (
                  <Link
                    key={p.id}
                    to={`/products/${p.id}`}
                    className="pp-other"
                    style={{ "--c-accent": p.accent }}
                  >
                    <span className="pp-other-t">
                      <span className="pp-other-n">{p.name}</span>
                      <span className="pp-other-i mono">{p.category}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="pp-sec">
            <div className="wrap">
              <div className="pp-cta">
                <div>
                  <h2>See {product.name} on your own data</h2>
                  <p>A 30-minute walkthrough, using numbers from your operation.</p>
                </div>
                <Link to="/#contact" className="pp-btn">
                  Start a conversation
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        video={video}
        accent={product.accent}
      />
    </>
  );
}

/**
 * What kind of screen a module is. Modules are parallel areas, not an
 * ordered process, so they carry a type label rather than a step number.
 */
function moduleKind(m) {
  return (
    {
      kpi: "numbers",
      timeline: "timeline",
      table: "register",
      chart: "chart",
      scorelist: "ranking",
      chat: "assistant",
      kanban: "board",
    }[m.type] || "screen"
  );
}

/** A plain-language line for each module, derived from what it actually shows. */
function moduleLine(m) {
  switch (m.type) {
    case "kpi":
      return `${m.data.length} headline numbers, refreshed as work is logged.`;
    case "timeline":
      return `${m.items.length} stages, from first contact through to handover.`;
    case "table":
      return `A working register — ${m.columns.slice(0, 3).join(", ").toLowerCase()} and more.`;
    case "chart":
      return m.note || "A breakdown you can read at a glance.";
    case "scorelist":
      return `Ranked by risk, so the ones needing attention surface first.`;
    case "chat":
      return "Ask it a question in plain English and get the number back.";
    case "kanban":
      return "Work moving stage by stage, with nothing dropped between them.";
    default:
      return "Part of the same connected system.";
  }
}

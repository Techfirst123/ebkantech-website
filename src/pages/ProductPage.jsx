import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { PRODUCTS, featuredFirst, hasDemo, hasVideo } from "../data/demoShowcase";
import { ModulePreview } from "../components/ProductDemos";
import VideoModal from "../components/VideoModal";
import TiltPanel from "../components/TiltPanel";
import TopBar from "../components/TopBar";
import SiteFooter from "../components/SiteFooter";
import { STORY } from "../data/productStory";

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
  const { hash } = useLocation();

  // <head> (title, description, canonical, structured data) is set by useSeo.
  // Arriving with a hash (/products/saurya-2x#faq) scrolls to that section.
  useEffect(() => {
    if (!product) return;
    const el = hash && document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [product, hash]);

  // Never leave the player open when moving to another product.
  useEffect(() => setVideoOpen(false), [id]);

  if (!product) return <NotFound />;

  const live = hasDemo(product);
  const video = hasVideo(product) ? product.video : null;
  const others = featuredFirst(PRODUCTS).filter((p) => p.id !== product.id);
  const kpis = (product.kpis || []).slice(0, 4);
  const story = STORY[product.id] || null;
  // pre-selects this product in the home-page enquiry form
  const contactTo = `/?interest=${product.id}#contact`;

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
                {story && (
                  <motion.p
                    className="pp-headline"
                    variants={rise}
                    initial="hidden"
                    animate="show"
                    custom={1.5}
                  >
                    {story.headline}
                  </motion.p>
                )}

                <motion.p
                  className="pp-blurb"
                  variants={rise}
                  initial="hidden"
                  animate="show"
                  custom={2}
                >
                  {story ? story.sub : product.blurb}
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
                  <Link to={contactTo} className={"pp-btn" + (video || live ? " pp-btn-ghost" : "")}>
                    Book a live demo
                  </Link>
                </motion.div>
                {story?.trust && (
                  <motion.ul
                    className="pp-trust"
                    variants={rise}
                    initial="hidden"
                    animate="show"
                    custom={4}
                  >
                    {story.trust.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </motion.ul>
                )}
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
                        <img src={video.poster} alt={`${product.name} product overview video`} width="1280" height="720" />
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
          {story && <StorySections story={story} />}

          {!story && (
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
                      <h3>{m.name}</h3>
                      <p>{moduleLine(m)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          )}

          <section className="pp-sec">
            <div className="wrap">
              <h2 className="pp-h2">Click through the product</h2>
              <p className="pp-lead">
                The same screens your team would use, filled with clearly-labelled
                sample data from a demo portfolio.
              </p>
              <ModulePreview project={product} />
            </div>
          </section>

          {story?.compare && <Compare data={story.compare} name={product.name} />}
          {story?.integrations && <Integrations data={story.integrations} />}
          {story?.rollout && <Rollout data={story.rollout} />}
          {story?.faq && <Faq items={story.faq} />}

          <section className="pp-sec">
            <div className="wrap">
              <div className="pp-cta">
                <div>
                  <h2>{story?.cta?.title || `See ${product.name} on your own data`}</h2>
                  <p>{story?.cta?.text || "A 30-minute walkthrough, using numbers from your operation."}</p>
                </div>
                <div className="pp-cta-actions">
                  <Link to={contactTo} className="pp-btn">
                    {story?.cta?.button || "Book a live demo"}
                  </Link>
                  {video && (
                    <button type="button" className="pp-btn pp-btn-ghost" onClick={() => setVideoOpen(true)}>
                      ▶ Watch the overview
                    </button>
                  )}
                </div>
              </div>
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

        </div>
      </main>
      <SiteFooter cta={false} />

      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        video={video}
        accent={product.accent}
      />
    </>
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
      return `A live register of ${listJoin(m.columns.map((c) => c.toLowerCase()))}.`;
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

function listJoin(a) {
  return a.length < 2 ? a.join("") : `${a.slice(0, -1).join(", ")} and ${a[a.length - 1]}`;
}

/* ---------------- long-form sales sections (data/productStory.js) ---------------- */

function Head({ eyebrow, title, lead }) {
  return (
    <>
      {eyebrow && <span className="pp-eyebrow mono">{eyebrow}</span>}
      <h2 className="pp-h2">{title}</h2>
      {lead && <p className="pp-lead">{lead}</p>}
    </>
  );
}

function StorySections({ story }) {
  const { facts, problems, differentiators, workstreams, audience } = story;
  return (
    <>
      {facts && (
        <section className="pp-facts-sec">
          <div className="wrap">
            <dl className="pp-facts">
              {facts.map((f) => (
                <div key={f.lbl}>
                  <dt>{f.val}</dt>
                  <dd>{f.lbl}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {problems && (
        <section className="pp-sec">
          <div className="wrap">
            <Head eyebrow="Why EPC teams switch" title={problems.title} lead={problems.lead} />
            <div className="pp-probs">
              {problems.items.map((x) => (
                <div className="pp-prob" key={x.p}>
                  <p className="pp-prob-p">
                    <span className="pp-x" aria-hidden="true">✕</span>
                    {x.p}
                  </p>
                  <p className="pp-prob-f">
                    <span className="pp-ok" aria-hidden="true">✓</span>
                    {x.f}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {differentiators && (
        <section className="pp-sec pp-sec-dark">
          <div className="wrap">
            <Head eyebrow="What makes it different" title={differentiators.title} lead={differentiators.lead} />
            <ol className="pp-diffs">
              {differentiators.items.map((x, i) => (
                <li key={x.t}>
                  <span className="pp-diff-n">{i + 1}</span>
                  <h3>{x.t}</h3>
                  <p>{x.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {workstreams && (
        <section className="pp-sec">
          <div className="wrap">
            <Head eyebrow="What's inside" title={workstreams.title} lead={workstreams.lead} />
            <div className="pp-ws">
              {workstreams.items.map((x) => (
                <div className="pp-mod" key={x.t}>
                  <span className="pp-ws-dot" aria-hidden="true" />
                  <h3>{x.t}</h3>
                  <p>{x.d}</p>
                </div>
              ))}
            </div>
            {workstreams.plus && (
              <>
                <h3 className="pp-h3">Plus</h3>
                <div className="pp-plus">
                  {workstreams.plus.map((x) => (
                    <div key={x.t}>
                      <h4>{x.t}</h4>
                      <p>{x.d}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {audience && (
        <section className="pp-sec">
          <div className="wrap">
            <Head eyebrow="Who it's for" title={audience.title} lead={audience.lead} />
            <div className="pp-types">
              {audience.types.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <div className="pp-roles">
              {audience.roles.map(([r, d]) => (
                <div key={r}>
                  <b>{r}</b>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

const MARK = {
  yes: { sym: "✓", label: "Yes" },
  partial: { sym: "Partly", label: "Partly" },
  no: { sym: "—", label: "No" },
};

function Compare({ data, name }) {
  return (
    <section className="pp-sec">
      <div className="wrap">
        <Head eyebrow="Comparison" title={data.title} />
        <div className="pp-cmp-scroll">
          <table className="pp-cmp">
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">Capability</span>
                </th>
                {data.cols.map((c) => (
                  <th scope="col" key={c} className={c === name ? "is-us" : ""}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map(([label, ...vals]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  {vals.map((v, i) => (
                    <td key={i} className={`m-${v}` + (data.cols[i] === name ? " is-us" : "")}>
                      <span aria-hidden="true">{MARK[v].sym}</span>
                      <span className="sr-only">{MARK[v].label}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="pp-cmp-key mono">✓ built in · Partly = limited, or needs workarounds · — not available</p>
      </div>
    </section>
  );
}

function Integrations({ data }) {
  return (
    <section className="pp-sec" id="security">
      <div className="wrap">
        <div className="pp-int">
          <div>
            <Head eyebrow="Connected" title={data.title} />
            <div className="pp-int-grid">
              {data.items.map(([t, d]) => (
                <div key={t}>
                  <h4>{t}</h4>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="pp-sec-card">
            <span className="pp-eyebrow mono">Security &amp; data</span>
            <ul>
              {data.security.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Rollout({ data }) {
  return (
    <section className="pp-sec">
      <div className="wrap">
        <Head eyebrow="Implementation" title={data.title} lead={data.lead} />
        <ol className="pp-roll">
          {data.steps.map(([w, t, d]) => (
            <li key={w}>
              <span className="mono">{w}</span>
              <h4>{t}</h4>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Faq({ items }) {
  return (
    <section className="pp-sec" id="faq">
      <div className="wrap">
        <Head eyebrow="FAQ" title="Questions EPC teams ask us" />
        <div className="pp-faq">
          {items.map((x, i) => (
            <details key={x.q} open={i === 0}>
              <summary>{x.q}</summary>
              <p>{x.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { hasDemo } from "../data/demoShowcase";

/**
 * Product cards that open your HTML client demos — modelled on the project
 * cards of anwarali.netlify.app (screenshot carousel, category, chips,
 * "Live Demo" button), drawn in this site's own tokens.
 *
 * Each card states honestly what its button opens:
 *   ● HTML DEMO            → `demo` is set in data/demoShowcase.js; opens it
 *   ○ SAMPLE-DATA PREVIEW  → no demo seeded yet; "Explore product" opens its
 *                            page with the module preview (labelled sample data)
 * Styles: showcase.css (pc- card, pm- media, cd- category strip).
 */

const SWIPE_PX = 40;
const MAX_CHIPS = 4;

const Chevron = ({ dir }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d={dir === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </svg>
);
const ArrowOut = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ---------- poster (shown until screenshots are added) ---------- */

function PosterChart({ chart }) {
  if (!chart?.values?.length) return null;
  const { values, kind } = chart;
  const W = 240;
  const H = 64;
  const max = Math.max(...values);
  const min = kind === "bar" ? 0 : Math.min(...values);
  const span = max - min || 1;
  const x = (i) => (values.length === 1 ? W / 2 : (i / (values.length - 1)) * W);
  const y = (v) => H - 6 - ((v - min) / span) * (H - 14);

  if (kind === "bar") {
    const bw = W / values.length;
    return (
      <svg className="pm-chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
        {values.map((v, i) => (
          <rect key={i} x={i * bw + bw * 0.18} width={bw * 0.64} y={y(v)} height={H - 6 - y(v)} rx="1.5"
            opacity={i === values.length - 1 ? 1 : 0.55} />
        ))}
      </svg>
    );
  }
  const pts = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  return (
    <svg className="pm-chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      <polygon points={`0,${H} ${pts} ${W},${H}`} opacity="0.14" stroke="none" />
      <polyline points={pts} fill="none" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function Poster({ product }) {
  return (
    // the accent is lightened so it reads on the dark poster surface
    <div className="pm-poster" style={{ "--pa": `color-mix(in srgb, ${product.accent} 70%, #fff)` }}>
      <span className="pm-poster-tag mono">Sample data</span>
      {product.kpis.length > 0 ? (
        <div className="pm-poster-kpis">
          {product.kpis.slice(0, 2).map((k) => (
            <div className="pm-kpi" key={k.lbl}>
              <span className="pm-kpi-val">{k.val}</span>
              <span className="pm-kpi-lbl mono">{k.lbl}</span>
            </div>
          ))}
        </div>
      ) : (
        // no KPI module for this product: name the chart that is shown instead
        <span className="pm-poster-title">{product.chartName}</span>
      )}
      <PosterChart chart={product.chart} />
    </div>
  );
}

/** One still picture of a product: its first screenshot, or the poster. */
export function ProductVisual({ product }) {
  const [broken, setBroken] = useState(false);
  const shot = product.screens[0];
  if (!shot || broken) return <Poster product={product} />;
  return (
    <img className="pm-img" src={shot.src} alt={shot.alt || `${product.name} screenshot`}
      loading="lazy" decoding="async" onError={() => setBroken(true)} />
  );
}

/* ---------- media: screenshot carousel, or the poster ---------- */

function Media({ product }) {
  const [failed, setFailed] = useState([]);
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);
  const downX = useRef(null);

  const shots = product.screens.filter((s) => !failed.includes(s.src));
  const count = shots.length;
  const current = Math.min(index, Math.max(count - 1, 0));

  // An image that failed before React attached onError still needs to fall back.
  useEffect(() => {
    const bad = [...(trackRef.current?.querySelectorAll("img") ?? [])]
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.getAttribute("data-src"));
    if (bad.length) setFailed((f) => [...new Set([...f, ...bad])]);
  }, []);

  if (count === 0) return <Poster product={product} />;

  const go = (d) => setIndex((current + d + count) % count);

  return (
    <div
      className="pm"
      role="group"
      aria-roledescription="carousel"
      aria-label={`${product.name} screenshots`}
      tabIndex={count > 1 ? 0 : undefined}
      onKeyDown={(e) => {
        if (count < 2) return;
        if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
        if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      }}
      onPointerDown={(e) => { downX.current = e.clientX; }}
      onPointerUp={(e) => {
        if (downX.current == null) return;
        const dx = e.clientX - downX.current;
        downX.current = null;
        if (count > 1 && Math.abs(dx) > SWIPE_PX) go(dx < 0 ? 1 : -1);
      }}
      onPointerCancel={() => { downX.current = null; }}
    >
      <div className="pm-track" ref={trackRef} style={{ transform: `translateX(-${current * 100}%)` }}>
        {shots.map((s, i) => (
          <img key={s.src} className="pm-img" src={s.src} data-src={s.src}
            alt={s.alt || `${product.name} screenshot ${i + 1}`}
            aria-hidden={i === current ? undefined : "true"}
            loading={i === 0 ? "eager" : "lazy"} decoding="async" draggable={false}
            onError={() => setFailed((f) => (f.includes(s.src) ? f : [...f, s.src]))} />
        ))}
      </div>
      {count > 1 && (
        <>
          <button type="button" className="pm-nav pm-prev" aria-label="Previous screenshot" onClick={() => go(-1)}>
            <Chevron dir="prev" />
          </button>
          <button type="button" className="pm-nav pm-next" aria-label="Next screenshot" onClick={() => go(1)}>
            <Chevron dir="next" />
          </button>
          <div className="pm-dots">
            {shots.map((s, i) => (
              <button type="button" key={s.src} className={"pm-dot" + (i === current ? " is-on" : "")}
                aria-label={`Show screenshot ${i + 1} of ${count}`}
                aria-current={i === current ? "true" : undefined} onClick={() => setIndex(i)} />
            ))}
          </div>
          <span className="pm-sr" aria-live="polite">Screenshot {current + 1} of {count}</span>
        </>
      )}
    </div>
  );
}

/* ---------- card ---------- */

export function ProductCard({ product }) {
  const live = hasDemo(product);
  const shown = product.chips.slice(0, MAX_CHIPS);
  const extra = product.chips.length - shown.length;

  return (
    <article className="pc" style={{ "--p-accent": product.accent }}>
      <div className="pc-media">
        <Media product={product} />
        {product.featured && <span className="pc-star mono">★ Featured</span>}
      </div>

      <div className="pc-body">
        <p className="pc-meta mono">
          <span className="pc-cat">{product.category}</span>
          <span className="pc-industry">{product.industry}</span>
        </p>
        <h3 className="pc-title">{product.name}</h3>
        <p className="pc-blurb">{product.blurb}</p>
        <ul className="pc-tags" aria-label="Modules">
          {shown.map((c) => <li key={c}>{c}</li>)}
          {extra > 0 && <li className="pc-more">+{extra}</li>}
        </ul>

        <div className="pc-foot">
          <span className={"pc-proof mono " + (live ? "is-live" : "is-preview")}>
            <span className="pc-proof-dot" aria-hidden="true" />
            {live ? "HTML demo" : "Sample-data preview"}
          </span>
          <div className="pc-actions">
            {live && (
              <a className="btn" href={product.demo} target="_blank" rel="noopener noreferrer">
                Open demo <ArrowOut />
              </a>
            )}
            <Link className={"btn" + (live ? " ghost" : "")} to={`/products/${product.id}`}>
              Explore product <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products }) {
  return (
    <div className="pc-grid">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}

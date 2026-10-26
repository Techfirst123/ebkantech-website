import { useState } from "react";
import { Link } from "react-router-dom";
import VideoModal from "./VideoModal";
import { PRODUCTS } from "../data/demoShowcase";
import { STORY } from "../data/productStory";

/**
 * Home-page feature band for the flagship product (Saurya2x).
 * Sits right under the hero, so a solar EPC prospect arriving from an
 * outreach message sees the product within one scroll.
 * Content comes from data/productStory.js and data/demoShowcase.js.
 */
const ID = "saurya-2x";

export default function SauryaFeature() {
  const product = PRODUCTS.find((p) => p.id === ID);
  const story = STORY[ID];
  const [open, setOpen] = useState(false);
  if (!product || !story) return null;
  const video = product.video;

  return (
    <section className="sf" id="saurya2x" style={{ "--c-accent": product.accent }}>
      <div className="wrap">
        <div className="sf-grid">
          <div className="sf-copy">
            <span className="sf-tag mono">
              <span className="pp-dot" aria-hidden="true" /> Flagship product · Live
            </span>
            <h2>
              <span className="sf-name">Saurya2x</span>
              {story.headline}
            </h2>
            <ul className="sf-points">
              {story.differentiators.items.map((d) => (
                <li key={d.t}>
                  <b>{d.t}.</b> {d.d.split(".")[0]}.
                </li>
              ))}
            </ul>
            <div className="sf-actions">
              <Link to={`/products/${ID}`} className="pp-btn">
                Explore Saurya2x →
              </Link>
              <Link to={`/?interest=${ID}#contact`} className="pp-btn pp-btn-ghost">
                Book a live demo
              </Link>
            </div>
          </div>

          {video && (
            <button type="button" className="sf-video" onClick={() => setOpen(true)} aria-label={`Play video: ${video.title}`}>
              <img src={video.poster} alt="" width="1280" height="720" loading="lazy" />
              <span className="pp-shot-play" aria-hidden="true">
                ▶
              </span>
              <span className="sf-video-cap mono">Watch the {video.duration} overview</span>
            </button>
          )}
        </div>
      </div>
      <VideoModal open={open} onClose={() => setOpen(false)} video={video} accent={product.accent} />
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { DESKTOP, gsap } from "../motion";
import { PRODUCTS, featuredFirst, hasDemo } from "../data/demoShowcase";
import { ProductVisual } from "./DemoShowcase";

/**
 * Pinned product showcase.
 *   desktop → the stage pins; scrolling steps through the products on the
 *             left while a tilted collage of product visuals slides past on
 *             the right (two columns moving in opposite directions)
 *   phones / reduced motion → a plain stacked list, each with its visual
 *
 * Products, visuals and demo links all come from data/demoShowcase.js, so
 * adding screenshots or a demo there updates this section too.
 * Styles: vibrant.css (.psc).
 */
const MAX_CHIPS = 4;

function Item({ product, isActive }) {
  const live = hasDemo(product);
  return (
    <article className={"psc-item" + (isActive ? " is-active" : "")} aria-hidden={isActive ? undefined : "true"}>
      <div className="psc-item-visual">
        <ProductVisual product={product} />
      </div>
      <p className="psc-meta mono" style={{ "--p-accent": product.accent }}>
        <span className="psc-cat">{product.category}</span> · {product.industry}
      </p>
      <h3 className="psc-name">{product.name}</h3>
      <p className="psc-blurb">{product.blurb}</p>
      <ul className="psc-chips">
        {product.chips.slice(0, MAX_CHIPS).map((c) => <li key={c}>{c}</li>)}
      </ul>
      <div className="psc-actions">
        {live && (
          <a className="btn" href={product.demo} target="_blank" rel="noopener noreferrer" tabIndex={isActive ? undefined : -1}>
            Open demo ↗
          </a>
        )}
        <Link className={"btn" + (live ? " ghost" : "")} to={`/products/${product.id}`} tabIndex={isActive ? undefined : -1}>
          Explore product →
        </Link>
      </div>
    </article>
  );
}

export default function ProductScroller() {
  const products = featuredFirst(PRODUCTS);
  const [active, setActive] = useState(0);
  // Only decides which item is "active"/reachable (layout comes from CSS).
  // Starts false so the prerendered HTML and the browser's first render
  // match; the desktop effect below switches it on immediately.
  const [pinned, setPinned] = useState(false);
  const stageRef = useRef(null);
  const colA = useRef(null);
  const colB = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(DESKTOP, () => {
      setPinned(true);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: `+=${products.length * 65}%`,
          pin: true,
          scrub: 0.6,
          onUpdate: (self) =>
            setActive(Math.min(products.length - 1, Math.floor(self.progress * products.length))),
        },
      });
      tl.fromTo(colA.current, { yPercent: 0 }, { yPercent: -42, ease: "none" }, 0).fromTo(
        colB.current,
        { yPercent: -42 },
        { yPercent: 0, ease: "none" },
        0,
      );
      return () => {
        setPinned(false);
        setActive(0);
      };
    });
    return () => mm.revert();
  }, [products.length]);

  // each collage column shows the products twice, so it never runs out while sliding
  const columnA = [...products, ...products];
  const columnB = [...products].reverse().concat([...products].reverse());

  return (
    <div className="psc" ref={stageRef}>
      <div className="psc-left">
        <span className="eyebrow">Our products</span>
        <h2 className="psc-title">
          Platforms built for <span className="hl">real operations</span>.
        </h2>
        <div className="psc-items">
          {products.map((p, i) => (
            <Item key={p.id} product={p} isActive={!pinned || i === active} />
          ))}
        </div>
        <ol className="psc-progress" aria-hidden="true">
          {products.map((p, i) => (
            <li key={p.id} className={i === active ? "is-on" : ""}>
              {p.name}
            </li>
          ))}
        </ol>
      </div>

      <div className="psc-collage" aria-hidden="true">
        <div className="psc-tilt">
          <div className="psc-col" ref={colA}>
            {columnA.map((p, i) => (
              <div className="psc-shot" key={`a${i}`}>
                <ProductVisual product={p} />
              </div>
            ))}
          </div>
          <div className="psc-col" ref={colB}>
            {columnB.map((p, i) => (
              <div className="psc-shot" key={`b${i}`}>
                <ProductVisual product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

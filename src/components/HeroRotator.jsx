import { useEffect, useRef, useState } from "react";
import { DESKTOP, gsap, reducedMotion, ScrollTrigger } from "../motion";

/**
 * The coloured last word of the hero headline, cycling as you scroll:
 *   desktop  → the hero pins briefly and the word follows scroll progress
 *   phones   → the word changes on a timer (pinning feels heavy on touch)
 *   reduced motion → stays on the first word
 *
 * All words sit in one grid cell, so the headline width never jumps.
 * Only the visible word is exposed to screen readers.
 * Styles: vibrant.css (.rot).
 */
export const HERO_WORDS = ["decisions", "forecasts", "dashboards", "growth"];

// `suffix` (the full stop) sits inside each word so a short word never
// leaves a gap before it — the rotator is as wide as its longest word.
export default function HeroRotator({ words = HERO_WORDS, suffix = "." }) {
  const [index, setIndex] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const hero = ref.current?.closest("section");
    const mm = gsap.matchMedia();

    mm.add(DESKTOP, () => {
      const st = ScrollTrigger.create({
        trigger: hero,
        // Pin just below the sticky nav bar (64px). If the hero is taller than
        // the space under the bar (e.g. 768px-high laptops), pin once its
        // BOTTOM reaches the window's bottom instead, so the milestone cards
        // are fully visible while the word changes. Re-evaluated on refresh.
        start: () => (hero.offsetHeight > window.innerHeight - 64 ? "bottom bottom" : "top 64px"),
        invalidateOnRefresh: true,
        end: "+=90%",
        pin: true,
        onUpdate: (self) =>
          setIndex(Math.min(words.length - 1, Math.floor(self.progress * words.length))),
      });
      return () => st.kill();
    });

    mm.add("(max-width: 980px)", () => {
      const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2200);
      return () => clearInterval(id);
    });

    return () => mm.revert();
  }, [words]);

  return (
    <span className="rot" ref={ref}>
      {words.map((w, i) => (
        <span
          key={w}
          className={"rot-word" + (i === index ? " is-on" : i < index ? " is-past" : "")}
          aria-hidden={i === index ? undefined : "true"}
        >
          {w}
          <span className="rot-sfx">{suffix}</span>
        </span>
      ))}
    </span>
  );
}

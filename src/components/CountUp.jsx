import { useEffect, useRef } from "react";
import { gsap, reducedMotion, ScrollTrigger, whenBooted } from "../motion";

/**
 * A stat that counts up from 0 the first time it scrolls into view (after
 * the loading screen has gone).
 * `value` is the final text, e.g. "15" or "20+": the number is animated and
 * anything after it (like "+") is kept as a suffix. Non-numeric values
 * ("End-to-end") are shown as-is. The final value is always in the HTML,
 * so it's correct with JavaScript or animation turned off.
 */
export default function CountUp({ value }) {
  const ref = useRef(null);
  const m = String(value).match(/^(\d+)(.*)$/);

  useEffect(() => {
    if (!m || reducedMotion()) return;
    const el = ref.current;
    const target = Number(m[1]);
    const suffix = m[2];
    const counter = { v: 0 };
    el.textContent = `0${suffix}`;

    const tween = gsap.to(counter, {
      v: target,
      duration: 1.6,
      ease: "power2.out",
      paused: true,
      onUpdate: () => {
        el.textContent = `${Math.round(counter.v)}${suffix}`;
      },
    });
    // start counting only once the loading screen is gone (and it's in view)
    let st;
    let cancelled = false;
    whenBooted().then(() => {
      if (cancelled) return;
      st = ScrollTrigger.create({
        trigger: el,
        start: "top bottom", // any part on screen (it sits low in the pinned hero)
        once: true,
        onEnter: () => tween.play(),
      });
    });
    return () => {
      cancelled = true;
      st?.kill();
      tween.kill();
      el.textContent = value;
    };
    // value is static per stat
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <span ref={ref}>{value}</span>;
}

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * One place to set up GSAP + ScrollTrigger for the scroll effects
 * (hero word rotation, count-up stats, pinned product showcase).
 *
 * Every effect checks `reducedMotion()` and falls back to a static layout,
 * so visitors who turn animations off still get all the content.
 */
gsap.registerPlugin(ScrollTrigger);

/*
 * Keep pin/scroll positions right when content above them changes height
 * after load — web fonts swapping in, images, the BI section's charts.
 * Stale positions are what produce blank white gaps while scrolling.
 */
if (typeof window !== "undefined") {
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  let lastHeight = 0;
  let timer;
  new ResizeObserver(() => {
    const h = document.body.scrollHeight;
    if (Math.abs(h - lastHeight) < 2) return;
    lastHeight = h;
    clearTimeout(timer);
    timer = setTimeout(() => ScrollTrigger.refresh(), 200);
  }).observe(document.body);
}

export const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/*
 * Boot signal. The loading screen (components/BootScreen.jsx) calls
 * markBooted() when it finishes; hero animations wait on whenBooted() so
 * they start when the visitor can actually see them, not behind the loader.
 */
let bootDone = false;
let resolveBoot;
const bootPromise = new Promise((r) => {
  resolveBoot = r;
});
export const markBooted = () => {
  if (bootDone) return;
  bootDone = true;
  // Pins were measured while the loader locked scrolling (no scrollbar), so
  // they're ~15px too wide now the scrollbar is back — re-measure everything.
  ScrollTrigger.refresh();
  resolveBoot();
};
export const whenBooted = () => bootPromise;

/** Pinned/scrubbed effects only run on wide screens; phones get simple layouts. */
export const DESKTOP = "(min-width: 981px) and (prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger };

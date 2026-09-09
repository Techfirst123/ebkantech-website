/**
 * Fires a GA4 event via the global gtag() function set up in index.html.
 * Safe to call even if gtag hasn't loaded yet (ad blockers, slow network,
 * dev environment) — it just silently no-ops instead of throwing.
 */
export function trackEvent(name, params = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

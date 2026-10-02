import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { routeMeta } from "./seo";
import { SITE } from "./data/site";

/**
 * Keeps <head> right while visitors move between pages in the app.
 * (The first page load already has the right head: scripts/prerender.mjs
 * writes it into each page's HTML at build time from the same routeMeta.)
 */
function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!value) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

export default function useSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const m = routeMeta(pathname);
    document.title = m.title;
    setMeta("name", "description", m.description);
    setMeta("name", "robots", m.noindex ? "noindex, follow" : "");
    setMeta("property", "og:title", m.title);
    setMeta("property", "og:description", m.description);
    setMeta("property", "og:url", m.canonical);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", SITE.shortName);
    setMeta("property", "og:image", SITE.url + SITE.logo);
    setMeta("name", "twitter:card", "summary");
    setMeta("name", "twitter:title", m.title);
    setMeta("name", "twitter:description", m.description);

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = m.canonical;

    let ld = document.getElementById("seo-jsonld");
    if (m.jsonLd) {
      if (!ld) {
        ld = document.createElement("script");
        ld.type = "application/ld+json";
        ld.id = "seo-jsonld";
        document.head.appendChild(ld);
      }
      ld.textContent = JSON.stringify(m.jsonLd);
    } else {
      ld?.remove();
    }
  }, [pathname]);
}

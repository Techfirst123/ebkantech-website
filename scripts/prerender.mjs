/**
 * Build step (runs after `vite build` and the SSR build — see package.json).
 *
 * For every page in allRoutes() it writes real HTML with that page's own
 * <title>, description, canonical URL, Open Graph tags and JSON-LD, so
 * Google can index each page without running JavaScript.
 * sitemap.xml and robots.txt are fixed files in public/.
 *
 * A page that fails to render is reported and still gets its <head>,
 * falling back to client-side rendering for the body.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const { render, allRoutes, routeMeta, SITE } = await import(
  pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href
);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf-8");

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function head(m) {
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<link rel="canonical" href="${esc(m.canonical)}" />`,
    m.noindex ? `<meta name="robots" content="noindex, follow" />` : "",
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE.shortName)}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${esc(m.canonical)}" />`,
    `<meta property="og:image" content="${esc(m.image || SITE.url + SITE.ogImage)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    m.noindex ? "" : `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    SITE.googleVerification
      ? `<meta name="google-site-verification" content="${esc(SITE.googleVerification)}" />`
      : "",
    // "<" escaped so content can never close the script tag
    m.jsonLd
      ? `<script type="application/ld+json" id="seo-jsonld">${JSON.stringify(m.jsonLd).replace(/</g, "\\u003c")}</script>`
      : "",
  ]
    .filter(Boolean)
    .join("\n    ");
}

function withHead(html, m) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta name="description"[^>]*>\s*/i, "")
    .replace("</head>", `    ${head(m)}\n  </head>`);
}

// Empty app shell for URLs that aren't prerendered (vercel.json falls back to
// it). It must NOT be the prerendered home page, or the browser would get
// home-page HTML for some other route and React would have to discard it.
fs.writeFileSync(
  path.join(dist, "app.html"),
  withHead(template, { ...routeMeta("/__shell__"), canonical: SITE.url + "/" }),
);

const routes = allRoutes();
let ok = 0;
const failed = [];

for (const url of routes) {
  const m = routeMeta(url);
  let body = "";
  try {
    body = render(url);
    ok++;
  } catch (err) {
    failed.push(`${url} — ${err.message}`);
  }
  const html = withHead(template, m).replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  // "/services/erp" → services/erp.html — what Vercel's cleanUrls serves for
  // that URL (and most static hosts do the same).
  const out = url === "/" ? path.join(dist, "index.html") : path.join(dist, `${url.slice(1)}.html`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log(`  ${body ? "prerendered" : "HEAD ONLY  "}  ${url}`);
}

// sitemap.xml and robots.txt are fixed files in public/ (copied to dist/ by
// Vite). When you add a page, add its <url> to public/sitemap.xml.
console.log(`\n  ${ok}/${routes.length} pages prerendered`);
if (failed.length) {
  console.log("  rendered head-only (body falls back to the browser):");
  failed.forEach((f) => console.log("   ", f));
}

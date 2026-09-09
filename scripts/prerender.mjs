/**
 * Static prerender step. Runs after `vite build` (see package.json).
 *
 * Emits a real HTML file per route, each with its own <title>,
 * description, canonical and Product JSON-LD, so every platform can be
 * indexed and ranked on its own terms. Also regenerates sitemap.xml from
 * the same project list, so adding a product can't leave the sitemap
 * stale.
 *
 * Fails soft per route: a route that can't render is reported and left
 * to the client-side SPA fallback rather than breaking the build.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

const { render, PROJECTS, SITE_URL } = await import(
  path.join(root, "dist-ssr/entry-server.js")
);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf-8");

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function buildHead({ title, description, canonical, jsonLd }) {
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${esc(canonical)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${esc(canonical)}" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : "",
  ]
    .filter(Boolean)
    .join("\n    ");
}

/**
 * Swap the template's homepage head tags for this route's, rather than
 * appending duplicates — two <title> tags is worse than none.
 */
function applyHead(html, head) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<link rel="canonical"[^>]*>\s*/i, "")
    .replace(/<meta name="description"[^>]*>\s*/i, "")
    .replace(/<meta property="og:title"[^>]*>\s*/i, "")
    .replace(/<meta property="og:description"[^>]*>\s*/i, "")
    .replace(/<meta property="og:url"[^>]*>\s*/i, "")
    .replace(/<meta name="twitter:title"[^>]*>\s*/i, "")
    .replace(/<meta name="twitter:description"[^>]*>\s*/i, "")
    .replace("</head>", `  ${head}\n  </head>`);
}

function productJsonLd(p) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.name,
    applicationCategory: "BusinessApplication",
    description: p.seo.description,
    url: `${SITE_URL}/products/${p.slug}`,
    provider: {
      "@type": "Organization",
      name: "Ebkan Tech Pvt Ltd",
      url: `${SITE_URL}/`,
    },
    offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
  };
}

const routes = PROJECTS.map((p) => ({
  url: `/products/${p.slug}`,
  out: path.join("products", p.slug, "index.html"),
  head: buildHead({
    title: p.seo.title,
    description: p.seo.description,
    canonical: `${SITE_URL}/products/${p.slug}`,
    jsonLd: productJsonLd(p),
  }),
}));

let ok = 0;
const failed = [];

for (const route of routes) {
  try {
    const appHtml = render(route.url);
    let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
    html = applyHead(html, route.head);

    const outPath = path.join(dist, route.out);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html);
    ok++;
    console.log(`  prerendered  ${route.url}`);
  } catch (err) {
    failed.push({ url: route.url, message: err.message });
    console.warn(`  SKIPPED      ${route.url} — ${err.message}`);
  }
}

// Sitemap regenerated from the same source, so it can never drift.
const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: `${SITE_URL}/`, priority: "1.0", freq: "weekly" },
  ...PROJECTS.map((p) => ({
    loc: `${SITE_URL}/products/${p.slug}`,
    priority: "0.8",
    freq: "monthly",
  })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.freq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
  )
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);

console.log(`\n  ${ok}/${routes.length} routes prerendered · sitemap: ${urls.length} URLs`);
if (failed.length) {
  console.log("  failed routes fall back to client-side rendering:");
  failed.forEach((f) => console.log(`    ${f.url} — ${f.message}`));
}

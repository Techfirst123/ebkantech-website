import { SITE } from "./data/site";
import { SCOPE } from "./data/scope";
import { PRODUCTS } from "./data/demoShowcase";

/**
 * Per-page SEO, built from the site's own content — one source for both
 *   - the browser (useSeo.js updates <head> on navigation), and
 *   - the build (scripts/prerender.mjs writes real HTML per page, plus
 *     sitemap.xml and robots.txt).
 * Adding a category or product automatically gives it a page, a title, a
 * description, structured data and a sitemap entry.
 *
 * Structured data states only facts from the site: no ratings, reviews or
 * prices are invented. Company details come from data/site.js.
 */

const abs = (path) => SITE.url + (path === "/" ? "/" : path);
const clip = (s, n = 158) => (s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…");

function organization() {
  const a = SITE.address;
  const hasAddress = a.street && a.locality;
  const org = {
    "@type": hasAddress ? ["Organization", "LocalBusiness"] : "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: SITE.shortName,
    url: abs("/"),
    logo: SITE.url + SITE.logo,
    image: SITE.url + SITE.logo,
    email: SITE.email,
    description: SITE.description,
  };
  if (SITE.phone) org.telephone = SITE.phone;
  if (hasAddress) {
    org.address = {
      "@type": "PostalAddress",
      streetAddress: a.street,
      addressLocality: a.locality,
      ...(a.region && { addressRegion: a.region }),
      ...(a.postalCode && { postalCode: a.postalCode }),
      addressCountry: a.country,
    };
  }
  if (SITE.sameAs.length) org.sameAs = SITE.sameAs;
  return org;
}

const provider = { "@id": `${SITE.url}/#organization` };

function breadcrumbs(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: abs(path),
    })),
  };
}

const graph = (...nodes) => ({ "@context": "https://schema.org", "@graph": nodes });

/** Every indexable page. */
export function allRoutes() {
  return [
    "/",
    ...SCOPE.map((c) => `/services/${c.slug}`),
    ...PRODUCTS.map((p) => `/products/${p.id}`),
  ];
}

/** Title, description, canonical and JSON-LD for one path. */
export function routeMeta(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";

  if (path === "/") {
    return {
      title: "Ebkan Tech — Data Science, ERP & CRM Software Company",
      description: clip(SITE.description),
      canonical: abs("/"),
      jsonLd: graph(organization(), {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        name: SITE.shortName,
        url: abs("/"),
        publisher: provider,
      }),
    };
  }

  const svc = path.match(/^\/services\/([^/]+)$/);
  if (svc) {
    const c = SCOPE.find((x) => x.slug === svc[1]);
    if (c) {
      const services = c.items.map((i) => i.title).join(", ");
      return {
        title: `${c.cat} Services | ${SITE.shortName}`,
        description: clip(`${c.sub} Services: ${services}.`),
        canonical: abs(path),
        jsonLd: graph(
          organization(),
          {
            "@type": "Service",
            name: `${c.cat} services`,
            serviceType: c.cat,
            description: c.sub,
            provider,
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: `${c.cat} services`,
              itemListElement: c.items.map((i) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: i.title, description: i.desc },
              })),
            },
          },
          breadcrumbs([["Home", "/"], [`${c.cat} services`, path]]),
        ),
      };
    }
  }

  const prod = path.match(/^\/products\/([^/]+)$/);
  if (prod) {
    const p = PRODUCTS.find((x) => x.id === prod[1]);
    if (p) {
      return {
        title: `${p.name} — ${p.industry} | ${SITE.shortName}`,
        description: clip(p.blurb),
        canonical: abs(path),
        jsonLd: graph(
          organization(),
          {
            "@type": "SoftwareApplication",
            name: p.name,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description: p.blurb,
            url: abs(path),
            publisher: provider,
          },
          breadcrumbs([["Home", "/"], [p.name, path]]),
        ),
      };
    }
  }

  // unknown page: never let it be indexed
  return {
    title: `Page not found | ${SITE.shortName}`,
    description: clip(SITE.description),
    canonical: abs("/"),
    noindex: true,
    jsonLd: null,
  };
}

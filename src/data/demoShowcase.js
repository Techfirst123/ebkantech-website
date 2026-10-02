import { PROJECTS } from "../components/ProductDemos";

/**
 * Product cards — the one file to edit when you add a client demo.
 *
 * HOW TO SEED AN HTML DEMO
 *   1. Put the demo in public/demos/<id>/  (index.html + its css/js/images)
 *      e.g. public/demos/warehouse-erp/index.html
 *   2. Set `demo` below to "/demos/<id>/index.html"
 *   3. Optional: add screenshots to the same folder and list them in `screens`
 *   4. Optional: `brochure` — a PDF in the same folder, offered as a download
 *      on the product's page (/products/<id>)
 *
 * Until `demo` is set, the card says "Sample-data preview" and its button
 * opens the in-page module preview instead — it never links to a demo that
 * isn't there.
 *
 * Keys are the product ids from PROJECTS in components/ProductDemos.jsx.
 * `categories` must use the same names as `cat` in App.jsx's SCOPE.
 */
export const SHOWCASE = {
  "warehouse-erp": {
    category: "ERP",
    categories: ["ERP", "Data Science"],
    featured: false,
    demo: "",
    screens: [], // e.g. [{ src: "/demos/warehouse-erp/1.webp", alt: "Stock ledger" }]
  },
  "field-service-erp": {
    category: "ERP",
    categories: ["ERP", "AI"],
    featured: false,
    demo: "",
    screens: [],
  },
  "solar-erp-10x": {
    category: "ERP",
    categories: ["ERP", "AI", "Data Science"], // AI co-pilot, risk prediction, BI
    featured: true,
    demo: "",
    brochure: "/demos/solar-erp-10x/brochure.pdf",
    screens: [],
  },
  "vantage-rental-5x": {
    category: "ERP",
    categories: ["ERP", "CRM", "Data Science"], // tenant/owner apps, churn, BI
    featured: true,
    demo: "",
    brochure: "/demos/vantage-rental-5x/brochure.pdf",
    screens: [],
  },
  "compliance-10x": {
    category: "Web & App Development",
    categories: ["Web & App Development", "CRM", "Data Science"], // client portal, filing-risk BI
    featured: true,
    demo: "",
    brochure: "/demos/compliance-10x/brochure.pdf",
    screens: [],
  },
};

/** Only same-site paths or http(s) URLs count as a real demo. */
export const hasDemo = (p) => /^(\/|https?:\/\/)/i.test(p.demo || "");

/**
 * Card-ready products: the PROJECTS records plus their showcase fields, with
 * poster numbers taken from each product's own KPI and chart modules.
 */
export const PRODUCTS = PROJECTS.map((p) => {
  const extra = SHOWCASE[p.id] || {};
  const kpiModule = p.modules.find((m) => m.type === "kpi");
  const chartModule = p.modules.find((m) => m.type === "chart");
  return {
    ...p,
    category: extra.category || "Product",
    categories: extra.categories || [],
    featured: !!extra.featured,
    demo: extra.demo || "",
    brochure: extra.brochure || "",
    screens: extra.screens || [],
    kpis: kpiModule ? kpiModule.data : [],
    chart: chartModule ? chartModule.chart : null,
    chartName: chartModule ? chartModule.name : "",
    chips: p.modules.map((m) => m.name),
  };
});

export const featuredFirst = (list) =>
  [...list].sort((a, b) => Number(b.featured) - Number(a.featured));

export const productsIn = (category) =>
  featuredFirst(PRODUCTS.filter((p) => p.categories.includes(category)));

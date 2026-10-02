/**
 * Scope of business — the parent categories and their services.
 *
 * Shared by the home page (category cards) and the per-category pages at
 * /services/<slug>. `cat` must match the category names used in
 * data/demoShowcase.js, which is how a category finds its demo products.
 * `accent` colours that category's card and page.
 */
export const SCOPE = [
  {
    cat: "Data Science",
    slug: "data-science",
    accent: "#3E6E96",
    sub: "Machine learning and analytics where it moves the number.",
    icon: (
      <>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
        <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
      </>
    ),
    items: [
      {
        code: "DS-01",
        title: "Supply Chain & Demand Forecasting",
        desc: "Demand prediction, inventory optimization, and supplier analytics to cut stockouts and holding cost.",
        tags: ["Forecasting", "Optimization", "Planning"],
        icon: (
          <>
            <path d="M3 3v18h18" />
            <path d="M7 14l3-4 3 3 5-7" />
          </>
        ),
      },
      {
        code: "DS-02",
        title: "Logistics & Route Optimization",
        desc: "Fleet, routing, and delivery models that lower cost-per-shipment and improve on-time rates.",
        tags: ["Routing", "ETA models", "Fleet"],
        icon: (
          <>
            <circle cx="6" cy="18" r="2" />
            <circle cx="18" cy="6" r="2" />
            <path d="M8 18h6a3 3 0 0 0 3-3V8M6 16V9a3 3 0 0 1 3-3h6" />
          </>
        ),
      },
      {
        code: "DS-03",
        title: "Hospital & Healthcare Analytics",
        desc: "Patient flow, bed occupancy, and resource forecasting to improve outcomes and utilization.",
        tags: ["Patient flow", "Capacity", "Reporting"],
        icon: (
          <>
            <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.65-7 10-7 10Z" />
            <path d="M12 8v4m-2-2h4" />
          </>
        ),
      },
      {
        code: "DS-04",
        title: "Warehouse & Inventory Intelligence",
        desc: "Slotting, stock movement, and replenishment analytics for faster, leaner warehouse operations.",
        tags: ["Slotting", "Replenishment", "Stock"],
        icon: (
          <>
            <path d="M3 9l9-6 9 6v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
            <path d="M7 21v-8h10v8M7 13h10" />
          </>
        ),
      },
      {
        code: "DS-05",
        title: "Customer Churn Prediction",
        desc: "Churn models and retention scoring that flag at-risk customers before they leave.",
        tags: ["Churn ML", "Segmentation", "Retention"],
        icon: (
          <>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 11l-3 3-2-2" />
          </>
        ),
      },
      {
        code: "DS-06",
        title: "E-commerce Sales Analytics & BI",
        desc: "Sales reports, cohort analysis, and revenue dashboards that make performance readable at a glance.",
        tags: ["Sales reports", "Dashboards", "Cohorts"],
        icon: (
          <>
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
          </>
        ),
      },
    ],
  },
  {
    cat: "ERP",
    slug: "erp",
    accent: "#C97A1F",
    sub: "Our own ERP products for power, solar and infrastructure projects.",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    items: [
      {
        code: "ERP-01",
        title: "ERP Saurya 2x",
        desc: "Our ERP for power and solar projects.",
        tags: ["Power", "Solar"],
        badge: "In development",
        icon: (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M19 5l-2 2M7 17l-2 2" />
          </>
        ),
      },
      {
        code: "ERP-02",
        title: "ERP Niraman 2x",
        desc: "Our ERP for infrastructure projects.",
        tags: ["Infrastructure", "Projects"],
        badge: "In development",
        icon: (
          <>
            <path d="M3 21h18M6 21V8l6-4 6 4v13" />
            <path d="M10 21v-5h4v5M9 11h.01M15 11h.01" />
          </>
        ),
      },
    ],
  },
  {
    cat: "CRM",
    slug: "crm",
    accent: "#2C6E6A",
    sub: "Our own CRM products for rental and sales teams.",
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <path d="M5.5 16a3.5 3.5 0 0 1 7 0M15 9h4M15 13h4" />
      </>
    ),
    items: [
      {
        code: "CRM-01",
        title: "Vantage 2x",
        desc: "Our CRM for rental businesses.",
        tags: ["Rental", "CRM"],
        badge: "In development",
        icon: (
          <>
            <path d="M3 10l9-6 9 6v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" />
            <path d="M9 21v-6h6v6" />
          </>
        ),
      },
      {
        code: "CRM-02",
        title: "Lead2x",
        desc: "Our sales CRM.",
        tags: ["Sales", "Leads"],
        badge: "In development",
        icon: (
          <>
            <path d="M3 3v18h18" />
            <path d="M7 15l4-4 3 3 6-7" />
          </>
        ),
      },
    ],
  },
  {
    cat: "Web & App Development",
    slug: "web-app-development",
    accent: "#6B5B95",
    sub: "Websites, web apps, and mobile products — designed and built end to end.",
    icon: <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />,
    items: [
      {
        code: "WEB-01",
        title: "Business Websites",
        desc: "Corporate sites, landing pages, and CMS builds that load fast and convert visitors.",
        tags: ["Websites", "CMS", "Landing pages"],
        icon: (
          <>
            <rect x="3" y="4" width="18" height="14" rx="2" />
            <path d="M3 8h18M6.5 6h.01M9 6h.01" />
          </>
        ),
      },
      {
        code: "WEB-02",
        title: "Web Applications",
        desc: "Dashboards, portals, and SaaS apps built on modern, scalable stacks.",
        tags: ["Dashboards", "Portals", "SaaS"],
        icon: (
          <>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9" />
          </>
        ),
      },
      {
        code: "WEB-03",
        title: "Mobile Apps",
        desc: "Native and cross-platform iOS/Android apps with clean, usable UX.",
        tags: ["iOS", "Android", "Cross-platform"],
        icon: (
          <>
            <rect x="7" y="2" width="10" height="20" rx="2" />
            <path d="M11 18h2" />
          </>
        ),
      },
      {
        code: "WEB-04",
        title: "E-commerce Stores",
        desc: "Online stores with carts, payments, and inventory wired to your operations.",
        tags: ["Storefront", "Payments", "Catalog"],
        icon: (
          <>
            <circle cx="9" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M3 3h2l2.4 12.6a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L21 7H6" />
          </>
        ),
      },
    ],
  },
  {
    cat: "AI",
    slug: "ai",
    accent: "#B4503A",
    sub: "Applied AI that automates work and surfaces decisions.",
    icon: (
      <>
        <path d="M12 3l1.8 4.7L18 9l-4.2 1.3L12 15l-1.8-4.7L6 9l4.2-1.3L12 3Z" />
        <path d="M18.5 14l.8 2 .7 1.9-2.1-.6-2.1.6.9-2-.9-1.9 2.1.6Z" />
      </>
    ),
    items: [
      {
        code: "AI-01",
        title: "AI Chatbots & Assistants",
        desc: "Conversational assistants and support bots that resolve queries around the clock.",
        tags: ["Chatbots", "Assistants", "Support"],
        icon: (
          <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2Z" />
        ),
      },
      {
        code: "AI-02",
        title: "Predictive Analytics",
        desc: "Forecasts and scoring models that turn history into forward-looking signals.",
        tags: ["Forecasting", "Scoring", "Modeling"],
        icon: (
          <>
            <path d="M23 6l-9.5 9.5-5-5L1 18" />
            <path d="M17 6h6v6" />
          </>
        ),
      },
      {
        code: "AI-03",
        title: "Computer Vision",
        desc: "Image and video models for detection, inspection, and recognition.",
        tags: ["Detection", "OCR", "Inspection"],
        icon: (
          <>
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </>
        ),
      },
      {
        code: "AI-04",
        title: "Generative AI & LLM Automation",
        desc: "LLM-driven workflows, RAG systems, and document automation that cut manual effort.",
        tags: ["LLM", "RAG", "Automation"],
        icon: (
          <>
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <rect x="9" y="9" width="6" height="6" />
            <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
          </>
        ),
      },
    ],
  },
  {
    cat: "Marketing Solution",
    slug: "marketing",
    accent: "#8C6B4F",
    sub: "Growth campaigns and analytics that move the funnel.",
    icon: (
      <>
        <path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1Z" />
        <path d="M16 8a5 5 0 0 1 0 8" />
      </>
    ),
    items: [
      {
        code: "MKT-01",
        title: "SEO & Content",
        desc: "Search optimization and content strategy that grow qualified organic traffic.",
        tags: ["SEO", "Content", "Organic"],
        icon: (
          <>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </>
        ),
      },
      {
        code: "MKT-02",
        title: "Performance Campaigns",
        desc: "Paid search and social campaigns tuned for ROAS and lower acquisition cost.",
        tags: ["Paid ads", "ROAS", "Funnels"],
        icon: (
          <>
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="12" cy="12" r="1" />
          </>
        ),
      },
      {
        code: "MKT-03",
        title: "Social Media Management",
        desc: "Content calendars, community, and social growth across the channels that matter.",
        tags: ["Social", "Community", "Content"],
        icon: (
          <>
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
          </>
        ),
      },
      {
        code: "MKT-04",
        title: "Marketing Analytics & CRO",
        desc: "Attribution, dashboards, and conversion-rate optimization that compound results.",
        tags: ["Attribution", "CRO", "Dashboards"],
        icon: (
          <>
            <path d="M21 15.5A9 9 0 1 1 8.5 3" />
            <path d="M21.2 8A9 9 0 0 0 16 2.8V8Z" />
          </>
        ),
      },
    ],
  },
];

export const getCategory = (slug) => SCOPE.find((c) => c.slug === slug);

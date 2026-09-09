/**
 * Single source of truth for the six platforms.
 *
 * Consumed by:
 *   - src/components/ProductDemos.jsx  (homepage accordion)
 *   - src/pages/ProductPage.jsx        (per-product detail route)
 *   - scripts/prerender.mjs            (static HTML + per-page JSON-LD)
 *
 * Anything product-specific belongs here and nowhere else. Adding a
 * seventh product means adding one entry — the route, the sitemap entry,
 * the structured data and the homepage card all follow automatically.
 */

export const SITE_URL = "https://ebkantech.com";

export const PROJECTS = [
  {
    slug: "warehouse-management-erp",
    accent: "#3E6E96",
    accentDark: "#6FA8D6",
    industry: "Warehousing & Logistics",
    name: "Warehouse Management ERP",
    blurb:
      "Stock, inter-warehouse movement and route intelligence in one control tower.",
    seo: {
      title: "Warehouse Management ERP Software | Ebkan Tech",
      description:
        "Multi-site warehouse ERP: live stock ledgers, inter-warehouse movement, route planning and BI demand forecasting. Built by Ebkan Tech for logistics operations.",
      keywords: "warehouse management ERP, inventory software, multi-warehouse stock",
    },
    intro:
      "Most warehouse operations run stock in one system, transfers in a spreadsheet, and dispatch on a phone call. This platform puts all three on the same record, so a unit's location, status and onward route are one query rather than three conversations.",
    cycle: [
      "Inbound receiving",
      "Stock allocation",
      "Warehouse movement",
      "Route dispatch",
      "BI demand forecast",
    ],
    kpis: [
      { val: "182,430", lbl: "Units on hand", sub: "across 6 sites" },
      { val: "78%", lbl: "Space utilisation", sub: "+4% vs last month" },
      { val: "94%", lbl: "Dispatch accuracy", sub: "trailing 30 days" },
      { val: "6", lbl: "Active warehouses", sub: "3 regions" },
    ],
    impact: {
      stat: "19%",
      label: "Fewer stockouts after demand forecasting",
      detail:
        "BI-driven reorder points and route optimisation cut stockouts 19% and trimmed average dispatch time by 12% over the last two quarters.",
    },
    chart: {
      kind: "bar",
      labels: ["Bengaluru N", "Chennai", "Pune E", "Hyderabad C", "Mumbai W", "Delhi N"],
      values: [92, 64, 78, 55, 88, 70],
    },
    chartNote:
      "Stock movement, dwell time and dispatch accuracy rolled into one turnover index per warehouse, so operations can see which sites are moving stock well and which are sitting on it.",
    modules: [
      ["Stock ledger", "Live quantity, reorder level and status per SKU per site."],
      ["Inter-warehouse transfers", "Transfer orders with ETA and in-transit tracking."],
      ["Route mapping", "Multi-stop dispatch routes with vehicle and ETA per leg."],
      ["BI & forecasting", "Turnover index, demand forecast and reorder recommendations."],
    ],
  },
  {
    slug: "field-service-erp",
    accent: "#C97A1F",
    accentDark: "#E3A84F",
    industry: "Solar EPC · Infrastructure · Networking",
    name: "Field Service ERP",
    blurb:
      "Material, vendor, site progress and quotation control for EPC and installation teams.",
    seo: {
      title: "Solar EPC & Field Service ERP Software | Ebkan Tech",
      description:
        "Field service ERP for solar EPC, infrastructure and networking contractors: vendor and sub-vendor management, site progress against photo evidence, milestone billing and automated quotations.",
      keywords: "solar EPC ERP, field service management software, contractor ERP",
    },
    intro:
      "EPC work fails on coordination, not craft. Procurement, finance and the crew on site usually see three different versions of the same project. This platform ties material delivery, site progress and payment milestones to one timeline.",
    cycle: [
      "Quotation",
      "Material & vendor procurement",
      "Site execution",
      "Progress tracking",
      "Milestone billing",
    ],
    kpis: [
      { val: "34", lbl: "Active sites", sub: "11 solar, 15 infra, 8 network" },
      { val: "46.2 MW", lbl: "Capacity under install", sub: "this quarter" },
      { val: "81%", lbl: "On-time milestone rate", sub: "trailing 90 days" },
      { val: "-3.2%", lbl: "Budget variance", sub: "favourable" },
    ],
    impact: {
      stat: "14%",
      label: "Fewer schedule overruns after AI progress analytics",
      detail:
        "Cross-referencing site photos, vendor deliveries and milestone dates automatically flags at-risk sites early, cutting schedule overruns 14% and material cost 9%.",
    },
    chart: {
      kind: "line",
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      values: [64, 68, 71, 75, 79, 81],
    },
    chartNote:
      "On-time milestone rate trending up as material and vendor delays get flagged before they hit the critical path, not after.",
    modules: [
      ["Vendor & sub-vendor", "Ordered vs delivered per material, per vendor tier."],
      ["Site progress", "Phase completion tracked against uploaded field photos."],
      ["Quotation automation", "Quotes generated from BOQ against your pricing rules."],
      ["Milestones & billing", "Progress-linked billing with overdue milestone flags."],
      ["HR & accounting", "Field staff deployment, payroll cycles, site expense reconciliation."],
      ["RBAC", "Separate site, vendor, finance and admin permission scopes."],
    ],
  },
  {
    slug: "sales-rental-crm",
    accent: "#2C6E6A",
    accentDark: "#4FB3AC",
    industry: "Multi-channel Product & Rental Business",
    name: "Sales & Rental CRM",
    blurb:
      "Recurring billing, client issues and churn intelligence for a rental-based product business.",
    seo: {
      title: "Rental CRM with Recurring Billing & Churn Analytics | Ebkan Tech",
      description:
        "CRM for rental and subscription product businesses: multi-channel sales, recurring payment handling, issue desk, churn prediction and demand forecasting.",
      keywords: "rental CRM, subscription billing software, churn prediction CRM",
    },
    intro:
      "A rental business lives or dies on retention, but most CRMs are built for one-off sales. This one treats the client relationship as the unit of value — payment history, issue history and churn risk on a single record.",
    cycle: [
      "Multi-channel lead capture",
      "Subscription & billing",
      "Issue resolution",
      "Churn & demand forecast",
      "Channel re-targeting",
    ],
    kpis: [
      { val: "₹18.4L", lbl: "Recurring revenue", sub: "this month" },
      { val: "3.1%", lbl: "Monthly churn", sub: "-1.7pt vs Apr" },
      { val: "96%", lbl: "Issues resolved in SLA", sub: "trailing 30 days" },
      { val: "412", lbl: "Active subscriptions", sub: "across 5 channels" },
    ],
    impact: {
      stat: "22%",
      label: "Revenue uplift after channel-mix optimisation",
      detail:
        "Shifting spend toward the channels the BI report showed converting best, plus earlier churn flags, lifted recurring revenue 22% and cut churn by 1.7 points.",
    },
    chart: {
      kind: "line",
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      values: [4.8, 4.2, 5.1, 3.9, 3.4, 3.1],
    },
    chartNote:
      "The same model feeding churn also drives demand and stock forecasting — flagging which products are likely to see a spike in rental requests next.",
    modules: [
      ["Channel pipeline", "Website, marketplace, retail and direct leads in one funnel."],
      ["Recurring payments", "Auto-debit, UPI and card cycles with overdue flags."],
      ["Issue desk", "Ticketing tied to the client and the rented product."],
      ["Churn intelligence", "Repeat-issue and payment-behaviour churn risk scoring."],
    ],
  },
  {
    slug: "b2b-loan-screening-crm",
    accent: "#6B5B95",
    accentDark: "#A493D1",
    industry: "Finance — Dubai, UAE",
    name: "B2B Loan Screening CRM",
    blurb:
      "Rule-based credit screening with AI-assisted risk scoring for B2B loan approval.",
    seo: {
      title: "B2B Loan Screening CRM for UAE Lenders | Ebkan Tech",
      description:
        "Loan origination and screening CRM for B2B lenders in Dubai and the UAE: automated financial statement analysis, configurable rule engine, AI risk scoring and committee workflow.",
      keywords: "loan screening software UAE, credit risk CRM Dubai, B2B lending software",
    },
    intro:
      "Credit teams spend most of their time reading the same four documents. This platform parses submitted financials automatically, runs them against your written policy as an executable rule set, and puts a scored file in front of the committee.",
    cycle: [
      "Application intake",
      "Rule-based screening",
      "AI risk scoring",
      "Committee approval",
      "Portfolio monitoring",
    ],
    kpis: [
      { val: "1.8", lbl: "Avg. DSCR of approved book", sub: "up from 1.2 in 2021" },
      { val: "68%", lbl: "Faster screening turnaround", sub: "vs manual review" },
      { val: "128", lbl: "Applications this quarter", sub: "AED 34.6M requested" },
      { val: "11%", lbl: "Fewer defaults", sub: "trailing cohort" },
    ],
    impact: {
      stat: "3x",
      label: "Faster screening after AI risk scoring",
      detail:
        "Automatic parsing of financials against the rule set turns a multi-day manual review into a same-day decision, with 11% fewer defaults in the approved cohort.",
    },
    chart: {
      kind: "line",
      labels: ["2021", "2022", "2023", "2024", "2025"],
      values: [1.2, 1.4, 1.35, 1.6, 1.8],
    },
    chartNote:
      "Three years of submitted financials parsed automatically and checked against the rule set, rather than read line by line by an analyst.",
    modules: [
      ["Screening queue", "Applications ranked by AI risk score and stage."],
      ["Rule engine", "DSCR, trading history and exposure caps as configurable thresholds."],
      ["Financial analysis", "Multi-year statement parsing and ratio extraction."],
      ["Committee workflow", "Intake to approval with second sign-off and audit trail."],
    ],
  },
  {
    slug: "gym-operations-portal",
    accent: "#B4503A",
    accentDark: "#E58366",
    industry: "Fitness — Dubai, UAE",
    name: "Multi-branch Gym Operations Portal",
    blurb:
      "Subscriptions, leads and staffing across 10 branches, with member engagement built in.",
    seo: {
      title: "Multi-branch Gym Management Software Dubai | Ebkan Tech",
      description:
        "Gym operations portal for multi-branch fitness chains: membership subscriptions, multi-channel lead generation, accessories inventory, staff payroll and member feedback analytics.",
      keywords: "gym management software Dubai, fitness CRM, multi-branch gym portal",
    },
    intro:
      "Ten branches usually means ten versions of the truth. This portal consolidates membership, leads, inventory and staffing across every location, and connects retention to the coaching plans that actually drive it.",
    cycle: [
      "Lead generation",
      "Membership conversion",
      "Engagement & coaching plans",
      "Renewal & retention",
      "Feedback loop",
    ],
    kpis: [
      { val: "6,840", lbl: "Active members", sub: "across 10 branches" },
      { val: "4.1%", lbl: "Monthly churn", sub: "-0.6pt vs last month" },
      { val: "AED 1.62M", lbl: "Subscription revenue", sub: "this month" },
      { val: "27%", lbl: "Lead conversion", sub: "trailing 30 days" },
    ],
    impact: {
      stat: "27%",
      label: "More converted leads after engagement scoring",
      detail:
        "Routing leads by channel performance and pairing new members with a motivational plan lifted conversion 27% and pulled monthly churn down 0.6 points.",
    },
    chart: {
      kind: "line",
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      values: [4.1, 4.2, 4.0, 4.4, 4.5, 4.6],
    },
    chartNote:
      "Feedback scores tracked alongside motivational-plan enrolment — members on an active plan show noticeably higher satisfaction and renewal rates.",
    modules: [
      ["Membership & subscriptions", "Plans, renewals and automated reminder cycles."],
      ["Lead generation", "Per-channel, per-branch lead capture and conversion rates."],
      ["Accessories inventory", "Stock and reorder levels per branch."],
      ["Staff & payroll", "Roles, salary cycles and per-trainer feedback scores."],
    ],
  },
  {
    slug: "laptop-service-rental-platform",
    accent: "#8C6B4F",
    accentDark: "#CBA87E",
    industry: "IT Hardware Services — Repair & Rental",
    name: "Laptop Service & Rental Platform",
    blurb:
      "Repair ticketing and device rental/leasing management in one operational system.",
    seo: {
      title: "Laptop Repair & Device Rental Management Software | Ebkan Tech",
      description:
        "One platform for laptop repair ticketing and device rental: intake and diagnosis, parts inventory forecasting, fleet utilisation tracking and SLA management across branches.",
      keywords:
        "laptop repair software, device rental management, IT asset rental platform",
    },
    intro:
      "Repair and rental are usually two systems that never speak. A serviced unit sits in a spreadsheet instead of rejoining the rental pool. This platform runs both as one loop, on one inventory record per device.",
    cycle: [
      "Intake & diagnosis",
      "Parts & inventory allocation",
      "Service / rental dispatch",
      "Return & QC",
      "Fleet health & demand forecast",
    ],
    kpis: [
      { val: "1,240", lbl: "Devices under management", sub: "612 rental, 628 in repair" },
      { val: "2.1 days", lbl: "Avg repair turnaround", sub: "-0.8 days vs last quarter" },
      { val: "84%", lbl: "Rental fleet utilisation", sub: "across 4 branches" },
      { val: "96%", lbl: "SLA compliance", sub: "trailing 30 days" },
    ],
    impact: {
      stat: "31%",
      label: "Faster repair turnaround after BI-driven parts forecasting",
      detail:
        "Predicting which parts an incoming fault needs before diagnosis is even complete cut average repair time 31% and lifted rental fleet utilisation 14 points, by keeping serviced units back in rotation faster.",
    },
    chart: {
      kind: "line",
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      values: [4.2, 3.8, 3.5, 3.0, 2.4, 2.1],
    },
    chartNote:
      "Average repair turnaround plotted against fleet utilisation — as tickets clear faster, more devices cycle back into the rental pool instead of sitting in the service queue.",
    modules: [
      ["Repair ticketing", "Intake, diagnosis and SLA clock against device history."],
      ["Parts inventory", "Live stock checked before a technician is assigned."],
      ["Rental fleet", "Booking, dispatch, return and per-branch utilisation."],
      ["Fleet forecasting", "Predicted part demand and units due back into rotation."],
    ],
  },
];

export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug);

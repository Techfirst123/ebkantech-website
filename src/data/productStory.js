/**
 * Long-form sales content for a product page (/products/<id>).
 *
 * A product with an entry here gets the full sales page: headline promise,
 * problems it fixes, differentiators, workstreams, who it's for, comparison,
 * integrations & security, rollout plan, FAQ and a strong closing CTA.
 * Products without an entry keep the shorter page.
 *
 * Saurya2x copy is taken from the product's own overview video and the
 * Solar EPC product demo brochure — keep it to things the product really does.
 */

export const STORY = {
  "saurya-2x": {
    headline: "The operating system for solar EPC — with compliance built in.",
    sub:
      "Tender to handover in one connected system. Sites stay locked until NOCs clear, material is issued only after QA passes, and margin is tracked down to the Watt — so your projects head sees the whole portfolio at 9 a.m. without calling five site engineers.",
    trust: ["Live in 6 weeks", "Your Excel BOQs migrated", "Field app for site engineers", "Hosted in the region you choose"],
    // facts about the product, not about customers
    facts: [
      { val: "15", lbl: "Connected modules" },
      { val: "8", lbl: "Lifecycle stages, tender → handover" },
      { val: "₹/Wp", lbl: "Margin tracked per project" },
      { val: "6 wk", lbl: "Typical rollout" },
    ],

    problems: {
      title: "The problems your team deals with every day",
      lead:
        "Most EPC teams run on Excel BOQs, WhatsApp groups, site diaries and memory. Here is what that costs — and how Saurya2x fixes each one.",
      items: [
        {
          p: "Bids priced from the last project's numbers",
          f: "Bid assessment scores each tender on cost, risk and win probability, using your own completed projects as the base.",
        },
        {
          p: "Site surveys living in WhatsApp photos",
          f: "A structured pre-execution survey captures terrain, shading, access and grid proximity against a checklist, photos attached.",
        },
        {
          p: "The BOQ in the quote is not the BOQ in the PO",
          f: "One BOQ carries from quotation to purchase order to store issue, and every revision records who changed what.",
        },
        {
          p: "Material that left the warehouse but never arrived",
          f: "Dispatch, transit and gate-in are logged per site, and shortages are flagged before the crew is standing idle.",
        },
        {
          p: "Three different answers on site progress",
          f: "Progress is captured daily against your own workscope milestones, by the person doing the work, with photos and GPS.",
        },
        {
          p: "Project margin known only after closure",
          f: "Live costing shows committed, incurred and forecast cost against budget — in ₹, ₹/Wp and % — while you can still act on it.",
        },
      ],
    },

    differentiators: {
      title: "Why not a generic ERP?",
      lead: "Generic ERPs treat solar like any other project. Saurya2x is built around how an EPC actually gets a plant commissioned.",
      items: [
        {
          t: "Compliance is a gate, not a note",
          d: "A project stays locked until each site clears its assessment and statutory NOCs — DISCOM, CEIG, Fire, Pollution. Generic ERPs only track approvals as tasks.",
        },
        {
          t: "Per-location, not just per-project",
          d: "Capacity, assessment, NOCs and clearances are tracked for each location, so one site proceeds while another waits for clearance.",
        },
        {
          t: "Solar-native WBS + BOQ engine",
          d: "Pick rooftop or ground-mount and the 14-stage WBS and BOQ generate per MW, string and inverter — straight from the component spec.",
        },
        {
          t: "QA-gated material issue",
          d: "Free-issue material unlocks only when the previous stage passes QA — a control that spreadsheets and generic ERPs simply don't have.",
        },
      ],
    },

    workstreams: {
      title: "Seven workstreams, one platform",
      lead: "Every module shares the same record: a site knows its BOQ, the BOQ knows its POs, and every material movement and milestone lands on the right project cost sheet automatically.",
      items: [
        { t: "Projects & WBS", d: "Projects, work structure, BOQ, billing milestones and site clearance." },
        { t: "Engineering & DMS", d: "Drawings, documents, revisions and statutory NOCs — versioned." },
        { t: "Procurement & Inventory", d: "POs, deliveries, quotations, transport, GRN and site stores." },
        { t: "Subcontractors & Vendors", d: "Onboarding, rate cards, work orders, KYC and compliance expiry." },
        { t: "Field Ops & QA/QC", d: "Daily progress, quality checks, punch lists and the material gate." },
        { t: "Financial & Profitability", d: "Budget, milestone billing, retention, payments and per-Watt margin." },
        { t: "O&M Handover", d: "Asset register, test results, warranties and the handover dossier." },
      ],
      plus: [
        { t: "Vendor portal + field app", d: "Token-secured self-service portal for vendors; a site-engineer app for clearance, photos and GPS." },
        { t: "One-click handover dossier", d: "As-built drawings, NOCs, serials and certificates packaged for the client automatically." },
        { t: "AI co-pilot", d: "Ask “Will Kadapa hit COD if structure lands Friday?” and get the answer, with the reason." },
        { t: "SCADA on the roadmap", d: "Live plant telemetry flowing into the same system after commissioning." },
      ],
    },

    audience: {
      title: "Built for your whole team",
      lead: "Rooftop C&I, ground-mount utility-scale and multi-site portfolios — every role works in the same system.",
      types: ["Rooftop C&I", "Ground-mount utility", "Multi-site portfolios", "Open-access projects"],
      roles: [
        ["Management", "Portfolio dashboard, approvals, reports"],
        ["Pre-sales", "Assessments, BOQs, quotations"],
        ["Procurement", "Vendors, POs, three-way match"],
        ["Project managers", "Milestones, progress, risk"],
        ["Site engineers", "Daily progress, material, crew — on mobile"],
        ["Stores", "Stock, issues, serial capture"],
        ["Finance", "Billing, retention, costing"],
        ["Vendors", "Job and invoice portal"],
      ],
    },

    compare: {
      title: "Saurya2x vs. what you use today",
      cols: ["Saurya2x", "Generic ERP", "Excel + WhatsApp"],
      rows: [
        ["Statutory NOCs block execution until cleared", "yes", "partial", "no"],
        ["Tracks each site location separately", "yes", "no", "partial"],
        ["BOQ generated per MW, string and inverter", "yes", "no", "no"],
        ["Material issue gated by QA", "yes", "no", "no"],
        ["One BOQ from quote → PO → store issue", "yes", "partial", "no"],
        ["Margin in ₹/Wp, live during execution", "yes", "partial", "no"],
        ["Site-engineer mobile app with photos & GPS", "yes", "partial", "partial"],
        ["Vendor self-service portal", "yes", "partial", "no"],
        ["Handover dossier generated automatically", "yes", "no", "no"],
      ],
    },

    integrations: {
      title: "Works with the systems you already use",
      items: [
        ["Accounting export", "Vouchers, bills and payments synced to your accounting system"],
        ["WhatsApp Business", "Site updates, approvals and vendor reminders"],
        ["E-invoicing", "Tax invoices in the format your country requires"],
        ["Weather & irradiance", "Site data for yield models and work-window planning"],
        ["E-signature", "Contracts, work orders and handover documents"],
        ["Power BI & Open API", "BI exports and your own internal tools"],
      ],
      security: [
        "Hosted in the region you choose, including in-country options",
        "Role-based access and two-factor login",
        "Full audit log of every edit, approval and rate change",
        "Daily backups with point-in-time restore",
        "Your data stays yours — exportable at any time",
      ],
    },

    rollout: {
      title: "Live in 6 weeks",
      lead: "We do the heavy lifting — including moving your existing Excel BOQs, vendor lists and site records.",
      steps: [
        ["Week 1", "Discovery", "Your workflows, roles and approval limits"],
        ["Week 2–3", "Data migration", "Sites, BOQs, vendors and stock from Excel"],
        ["Week 4", "Setup", "Templates, integrations and your branding"],
        ["Week 5", "Training", "Hands-on, per team, with your own data"],
        ["Week 6", "Go-live", "With dedicated support from our team"],
      ],
    },

    faq: [
      {
        q: "Is Saurya2x cloud-based or on-premise?",
        a: "It runs in the cloud and is hosted in the region you choose, including in-country options. Your team uses it in the browser; site engineers use the mobile field app.",
      },
      {
        q: "We run everything on Excel today. How hard is it to switch?",
        a: "That is the most common starting point. In weeks 2–3 of rollout we migrate your existing BOQs, vendor lists, sites and stock from Excel, so your team starts with its own data — not a blank system.",
      },
      {
        q: "Does it work for both rooftop and ground-mount projects?",
        a: "Yes. You pick rooftop or ground-mount when setting up a project, and the WBS and BOQ are generated for that type — per MW, string and inverter.",
      },
      {
        q: "Can it connect to our accounting software?",
        a: "Yes. Vouchers, vendor bills and payments are exported to your accounting system, and there is an open API and Power BI export for your own tools.",
      },
      {
        q: "Can vendors and subcontractors use it?",
        a: "Yes. Vendors get a secure self-service portal for jobs, documents and invoices. Vendors with expired compliance documents cannot be awarded work.",
      },
      {
        q: "How is Saurya2x priced?",
        a: "Pricing depends on the modules, number of sites and users you need. Tell us your project volume and we will send a clear quote — no long-term lock-in, and your data is always exportable.",
      },
      {
        q: "Can we see it on our own project first?",
        a: "Yes. Send us one project's BOQ and vendor list, and in a 30-minute live demo we will show you your own dashboard.",
      },
    ],

    cta: {
      title: "See Saurya2x running on your own project",
      text: "Send us one project's BOQ and vendor list. In a 30-minute live demo, we'll show you your own dashboard.",
      button: "Book a live demo",
    },
  },
};

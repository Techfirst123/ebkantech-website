import { useEffect, useRef, useState } from "react";

const DEFAULT_NOTE =
  "This opens your email app with the message pre-filled to sales@ebkantech.com — nothing is sent automatically.";

// Scope of business — parent categories, each with its subcategory cards.
const SCOPE = [
  {
    cat: "Data Science",
    sub: "Machine learning and analytics where it moves the number.",
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
    sub: "ERP platforms shaped to how your operations actually run.",
    items: [
      {
        code: "ERP-01",
        title: "Solar EPC ERP",
        desc: "End-to-end ERP for solar EPC — project costing, procurement, site progress, and commissioning.",
        tags: ["Costing", "Procurement", "Site progress", "Commissioning"],
        badge: "Delivered",
        icon: (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M19 5l-2 2M7 17l-2 2" />
          </>
        ),
      },
      {
        code: "ERP-02",
        title: "Construction ERP",
        desc: "Construction ERP covering budgets, BOQ, subcontractors, inventory, and progress billing.",
        tags: ["BOQ", "Subcontractors", "Inventory", "Progress billing"],
        badge: "Delivered",
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
    sub: "Customer platforms tied directly to your sales process.",
    items: [
      {
        code: "CRM-01",
        title: "CRM Solutions",
        desc: "Customer relationship platforms — pipeline, lead scoring, and reporting tied to your sales process.",
        tags: ["Pipeline", "Lead scoring", "Reports"],
        icon: (
          <>
            <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
            <circle cx="10" cy="7" r="3" />
            <path d="M21 21v-2a4 4 0 0 0-3-3.87M17 3.13A4 4 0 0 1 17 11" />
          </>
        ),
      },
    ],
  },
  {
    cat: "Web & App Development",
    sub: "Websites, web apps, and mobile products — designed and built end to end.",
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
    sub: "Applied AI that automates work and surfaces decisions.",
    items: [
      {
        code: "AI-01",
        title: "AI Chatbots & Assistants",
        desc: "Conversational assistants and support bots that resolve queries around the clock.",
        tags: ["Chatbots", "Assistants", "Support"],
        icon: <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2Z" />,
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
    sub: "Growth campaigns and analytics that move the funnel.",
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

// Reusable brand logo mark (Ebkan Tech logo image)
function LogoMark() {
  return <img className="mark" src="/ebkan-tech-logo.png" alt="Ebkan Tech logo" />;
}

export default function App() {
  const [theme, setTheme] = useState(null); // null = follow system
  const [note, setNote] = useState({ text: DEFAULT_NOTE, color: undefined });
  const [activeScope, setActiveScope] = useState(0); // selected business category
  const canvasRef = useRef(null);

  // Apply the chosen theme to <html data-theme="…"> (mirrors the old toggle)
  useEffect(() => {
    if (theme) document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const current =
      theme ??
      (window.matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light");
    setTheme(current === "dark" ? "light" : "dark");
  };

  // Hero blueprint canvas — animated drifting node lattice
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf;
    let nodes = [];
    let t = 0;
    let w = 0;
    let h = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

    const cssVar = (name, fallback) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
      fallback;

    const build = () => {
      nodes = [];
      const gap = Math.max(64, Math.min(w, h) / 9);
      for (let y = -gap; y < h + gap; y += gap) {
        for (let x = -gap; x < w + gap; x += gap) {
          nodes.push({ bx: x, by: y, ph: Math.random() * 6.28 });
        }
      }
    };

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const gap = Math.max(64, Math.min(w, h) / 9);
      ctx.strokeStyle = cssVar("--grid", "rgba(13,24,38,.06)");
      ctx.lineWidth = 1;
      for (let gx = 0; gx < w; gx += gap) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.stroke();
      }
      for (let gy = 0; gy < h; gy += gap) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }
      const ac = cssVar("--accent", "#E5891A");
      for (const n of nodes) {
        const nx = n.bx + Math.sin(t * 0.6 + n.ph) * 6;
        const ny = n.by + Math.cos(t * 0.5 + n.ph) * 6;
        const pulse = (Math.sin(t * 1.4 + n.ph) + 1) / 2;
        if (pulse > 0.86) {
          ctx.fillStyle = ac;
          ctx.globalAlpha = (0.5 * (pulse - 0.86)) / 0.14 + 0.15;
          ctx.beginPath();
          ctx.arc(nx, ny, 2.1, 0, 6.28);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
    };

    const loop = () => {
      t += 0.012;
      draw();
      raf = requestAnimationFrame(loop);
    };

    size();
    window.addEventListener("resize", size);
    if (reduce) draw();
    else loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
    };
  }, []);

  // Contact form -> compose email (no data sent automatically)
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = (data.get("name") || "").trim();
    const email = (data.get("email") || "").trim();
    const company = (data.get("company") || "").trim();
    const service = (data.get("service") || "").trim();
    const message = (data.get("message") || "").trim();

    if (!name || !email) {
      setNote({ text: "Please add your name and email first.", color: "var(--accent)" });
      return;
    }
    const subject = `Enquiry: ${service} — ${name}${company ? ` (${company})` : ""}`;
    const body = `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nService: ${service}\n\n${message}\n`;
    window.location.href = `mailto:sales@ebkantech.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setNote({
      text: "Your email app should now open with the message ready to send.",
      color: "var(--teal)",
    });
  };

  const h2Compact = {
    fontSize: "clamp(1.6rem,3.2vw,2.3rem)",
    letterSpacing: "-.03em",
    margin: ".3em 0 16px",
    fontWeight: 800,
  };

  return (
    <>
      <header className="nav">
        <div className="wrap nav-in">
          <a className="brand" href="#top">
            <LogoMark />
            Ebkan Tech <small>/ data &amp; ERP</small>
          </a>
          <nav className="links">
            <a href="#scope">Services</a>
            <a href="#process">How we work</a>
            <a href="#delivered">Delivered</a>
            <a href="#about">About</a>
            <button className="theme-t" id="themeBtn" type="button" onClick={toggleTheme}>
              ◐ theme
            </button>
            <a href="#contact" className="btn keep">
              Talk to us
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero" style={{ padding: 0 }}>
          <canvas id="grid-canvas" ref={canvasRef} aria-hidden="true" />
          <div className="wrap hero-in">
            <div className="hero-top">
              <span className="chip mono">
                DATA SCIENCE · <b>ERP</b> · CRM
              </span>
              <span className="chip mono">Delivered: Solar EPC &amp; Construction ERP</span>
            </div>
            <h1>
              We turn your business data into <span className="amp">decisions</span>.
            </h1>
            <p className="lede">
              Ebkan Tech Pvt Ltd builds data science solutions and industry ERP/CRM systems —
              forecasting supply chains, cutting churn, streamlining warehouses and hospitals, and
              running purpose-built ERPs for solar EPC and construction.
            </p>
            <div className="hero-cta">
              <a href="#contact" className="btn">
                Request a consultation
              </a>
              <a href="#scope" className="btn ghost">
                Explore our services →
              </a>
            </div>
            <div className="hero-meta">
              <div>
                <div className="n">9</div>
                <div className="l">Solution areas</div>
              </div>
              <div>
                <div className="n">2</div>
                <div className="l">ERP verticals delivered</div>
              </div>
              <div>
                <div className="n">6+</div>
                <div className="l">Industries served</div>
              </div>
              <div>
                <div className="n">End-to-end</div>
                <div className="l">Data to dashboard</div>
              </div>
            </div>
          </div>
        </section>

        {/* SCOPE / SERVICES */}
        <section className="scope" id="scope">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <span className="eyebrow">Scope of business</span>
                <h2>Data science, ERP, web, AI and marketing — organized by category.</h2>
              </div>
              <p>
                Each category below groups the services we deliver — machine learning and analytics,
                ERP/CRM platforms, web &amp; app builds, applied AI, and growth marketing.
              </p>
            </div>
            <div className="cat-tabs" role="tablist" aria-label="Business categories">
              {SCOPE.map((group, i) => (
                <button
                  type="button"
                  key={group.cat}
                  className={"cat-tab" + (i === activeScope ? " is-active" : "")}
                  onClick={() => setActiveScope(i)}
                  role="tab"
                  aria-selected={i === activeScope}
                >
                  <span className="cat-tab-name">{group.cat}</span>
                  <span className="cat-tab-sub">{group.sub}</span>
                  <span className="cat-tab-meta">
                    {group.items.length} {group.items.length === 1 ? "service" : "services"} →
                  </span>
                </button>
              ))}
            </div>

            <div className="cap-grid" role="tabpanel">
              {SCOPE[activeScope].items.map((it) => (
                <article className="cap" key={it.code}>
                  {it.badge && <span className="badge">{it.badge}</span>}
                  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    {it.icon}
                  </svg>
                  <div className="code">{it.code}</div>
                  <h3>{it.title}</h3>
                  <p>{it.desc}</p>
                  <ul>
                    {it.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* DELIVERED / PROOF */}
        <section className="delivered" id="delivered">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <span className="eyebrow">Delivered work</span>
                <h2>Two industry ERPs, shipped and running.</h2>
              </div>
              <p>Purpose-built platforms — not generic templates — for two demanding, project-driven verticals.</p>
            </div>
            <div className="case-grid">
              <div className="case">
                <span className="tag">Solar EPC · ERP</span>
                <h4>Solar EPC ERP</h4>
                <p>
                  A single system for solar engineering, procurement and construction: project
                  costing, material procurement, on-site progress tracking, and commissioning —
                  connecting the finance team, the warehouse, and the field.
                </p>
                <div className="facts">
                  <div className="f">
                    <div className="fn">Project</div>
                    <div className="fl">Costing &amp; budgets</div>
                  </div>
                  <div className="f">
                    <div className="fn">Procure</div>
                    <div className="fl">Vendor &amp; material</div>
                  </div>
                  <div className="f">
                    <div className="fn">Site</div>
                    <div className="fl">Progress &amp; commissioning</div>
                  </div>
                </div>
              </div>
              <div className="case">
                <span className="tag">Construction · ERP</span>
                <h4>Construction ERP</h4>
                <p>
                  An ERP shaped around how construction firms actually operate: BOQ and estimation,
                  subcontractor management, inventory and stores, progress billing, and live
                  budget-vs-actual across every project.
                </p>
                <div className="facts">
                  <div className="f">
                    <div className="fn">BOQ</div>
                    <div className="fl">Estimation</div>
                  </div>
                  <div className="f">
                    <div className="fn">Billing</div>
                    <div className="fl">Progress &amp; RA bills</div>
                  </div>
                  <div className="f">
                    <div className="fn">Stores</div>
                    <div className="fl">Inventory &amp; subcon</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <span className="eyebrow">How we work</span>
                <h2>From raw data to a system you rely on.</h2>
              </div>
              <p>Five stages, run in order. Each ends in something you can see, test, or ship.</p>
            </div>
            <div className="proc-grid">
              <div className="step">
                <div className="num">01 · Understand</div>
                <h4>Define the outcome</h4>
                <p>We map your data sources, the decision to improve, and how success will be measured.</p>
              </div>
              <div className="step">
                <div className="num">02 · Prepare</div>
                <h4>Clean &amp; model data</h4>
                <p>Pipelines, warehousing, and feature engineering to make the data trustworthy.</p>
              </div>
              <div className="step">
                <div className="num">03 · Build</div>
                <h4>Model &amp; develop</h4>
                <p>ML models or ERP/CRM modules built in increments, reviewed with you each sprint.</p>
              </div>
              <div className="step">
                <div className="num">04 · Deploy</div>
                <h4>Ship to production</h4>
                <p>Dashboards, APIs, or full systems deployed with testing and clean handover.</p>
              </div>
              <div className="step">
                <div className="num">05 · Support</div>
                <h4>Monitor &amp; improve</h4>
                <p>We track accuracy and usage, retrain models, and evolve the roadmap with you.</p>
              </div>
            </div>
          </div>
        </section>

        {/* STACK */}
        <section className="stack" id="stack">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <span className="eyebrow">Technology</span>
                <h2>The tools behind the work.</h2>
              </div>
              <p>Proven data science, BI, and platform tooling — chosen for accuracy, scale, and maintainability.</p>
            </div>
            <div className="stack-cols">
              <div>
                <h5>Data Science &amp; ML</h5>
                <ul>
                  <li>Python</li>
                  <li>pandas / NumPy</li>
                  <li>scikit-learn</li>
                  <li>XGBoost</li>
                  <li>TensorFlow / PyTorch</li>
                  <li>Prophet</li>
                </ul>
              </div>
              <div>
                <h5>Analytics &amp; BI</h5>
                <ul>
                  <li>Power BI</li>
                  <li>Tableau</li>
                  <li>SQL</li>
                  <li>Snowflake</li>
                  <li>Apache Airflow</li>
                </ul>
              </div>
              <div>
                <h5>ERP &amp; CRM</h5>
                <ul>
                  <li>ERPNext / Frappe</li>
                  <li>Odoo</li>
                  <li>Custom ERP</li>
                  <li>Zoho CRM</li>
                  <li>Salesforce</li>
                </ul>
              </div>
              <div>
                <h5>Platform &amp; Cloud</h5>
                <ul>
                  <li>AWS / Azure</li>
                  <li>PostgreSQL</li>
                  <li>FastAPI</li>
                  <li>Docker</li>
                  <li>REST APIs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* INDUSTRIES + ENGAGEMENT MODELS */}
        <section id="industries">
          <div className="wrap two">
            <div>
              <span className="eyebrow">Where we work</span>
              <h2 style={h2Compact}>Industries we serve</h2>
              <p style={{ color: "var(--muted)", maxWidth: "44ch", margin: "0 0 22px" }}>
                Domain context shortens every project. These are the sectors our data and ERP work
                lives in.
              </p>
              <div className="ind-list">
                <span>Supply Chain &amp; Logistics</span>
                <span>Healthcare &amp; Hospitals</span>
                <span>E-commerce &amp; Retail</span>
                <span>Warehousing</span>
                <span>Solar &amp; Renewable Energy</span>
                <span>Construction &amp; Infrastructure</span>
                <span>Manufacturing</span>
              </div>
            </div>
            <div>
              <span className="eyebrow">Engagement models</span>
              <h2 style={h2Compact}>Ways to work with us</h2>
              <div className="models">
                <div className="model">
                  <div className="mc">M-A</div>
                  <div>
                    <h4>Fixed-scope project</h4>
                    <p>Defined deliverable — a model, dashboard, or ERP module — with milestones and a fixed price.</p>
                  </div>
                </div>
                <div className="model">
                  <div className="mc">M-B</div>
                  <div>
                    <h4>Data science retainer</h4>
                    <p>An ongoing analytics partner that keeps models accurate and reporting fresh.</p>
                  </div>
                </div>
                <div className="model">
                  <div className="mc">M-C</div>
                  <div>
                    <h4>ERP / CRM implementation</h4>
                    <p>End-to-end rollout — configuration, data migration, training, and go-live support.</p>
                  </div>
                </div>
                <div className="model">
                  <div className="mc">M-D</div>
                  <div>
                    <h4>Managed support &amp; AMC</h4>
                    <p>We run and evolve your platform under a support agreement so your team can focus elsewhere.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT + TEAM */}
        <section id="about">
          <div className="wrap">
            <div className="about-in">
              <div className="about-copy">
                <span className="eyebrow">About us</span>
                <h2>A data-driven team, close to your operations.</h2>
                <p>
                  Ebkan Tech Pvt Ltd is a data science and enterprise software company. We help
                  businesses in supply chain, healthcare, e-commerce, energy and construction make
                  better decisions with their own data — and run the ERP and CRM systems those
                  decisions depend on.
                </p>
                <p>
                  We work close to the problem: understanding how a warehouse actually moves stock,
                  how a solar project gets costed, or why customers churn — then building models and
                  systems that fit that reality, not a template.
                </p>
              </div>
              <div className="vals">
                <div className="val">
                  <div className="vt">01</div>
                  <h4>Domain-first</h4>
                  <p>We learn your process before we model it. Context beats a fancy algorithm.</p>
                </div>
                <div className="val">
                  <div className="vt">02</div>
                  <h4>Measurable impact</h4>
                  <p>Every engagement targets a number: cost, time, accuracy, or retention.</p>
                </div>
                <div className="val">
                  <div className="vt">03</div>
                  <h4>Own your systems</h4>
                  <p>Clean handover, documentation, and training — no lock-in, no black boxes.</p>
                </div>
                <div className="val">
                  <div className="vt">04</div>
                  <h4>Long-term support</h4>
                  <p>We stay on to retrain models and evolve platforms as your business grows.</p>
                </div>
              </div>
            </div>

            <div className="team">
              <span className="eyebrow">The team</span>
              <div className="team-grid">
                <div className="member">
                  <div className="avatar" aria-hidden="true">EK</div>
                  <div className="mn">Founder Name</div>
                  <div className="mr">Founder &amp; CEO</div>
                </div>
                <div className="member">
                  <div className="avatar" aria-hidden="true">DS</div>
                  <div className="mn">Lead Name</div>
                  <div className="mr">Head of Data Science</div>
                </div>
                <div className="member">
                  <div className="avatar" aria-hidden="true">ER</div>
                  <div className="mn">Lead Name</div>
                  <div className="mr">ERP Practice Lead</div>
                </div>
                <div className="member">
                  <div className="avatar" aria-hidden="true">BI</div>
                  <div className="mn">Lead Name</div>
                  <div className="mr">Analytics &amp; BI Lead</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="quotes">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <span className="eyebrow">Client voices</span>
                <h2>What partners say about working with us.</h2>
              </div>
              <p>A few words from the teams we&apos;ve built data and ERP solutions for.</p>
            </div>
            <div className="q-grid">
              <div className="quote">
                <div className="qm">“</div>
                <p>The demand forecasting models cut our stockouts noticeably and gave planning a number they could trust every week.</p>
                <div className="who">
                  <span className="dot">SC</span>
                  <div>
                    <div className="wn">Client Name</div>
                    <div className="wr">Head of Supply Chain</div>
                  </div>
                </div>
              </div>
              <div className="quote">
                <div className="qm">“</div>
                <p>Their Solar EPC ERP finally connected our procurement, finance and site teams in one place. Project visibility is completely different now.</p>
                <div className="who">
                  <span className="dot">SE</span>
                  <div>
                    <div className="wn">Client Name</div>
                    <div className="wr">Director, Solar EPC</div>
                  </div>
                </div>
              </div>
              <div className="quote">
                <div className="qm">“</div>
                <p>The churn model flags at-risk customers early enough for us to act. It&apos;s become part of how the sales team works.</p>
                <div className="who">
                  <span className="dot">EC</span>
                  <div>
                    <div className="wn">Client Name</div>
                    <div className="wr">E-commerce Growth Lead</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA / CONTACT */}
        <section className="cta" id="contact">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <span className="eyebrow">Start a conversation</span>
                <h2
                  style={{
                    fontSize: "clamp(1.7rem,3.4vw,2.5rem)",
                    letterSpacing: "-.03em",
                    fontWeight: 800,
                    margin: ".25em 0 0",
                    maxWidth: "20ch",
                  }}
                >
                  Have data, a report, or an ERP need? Let&apos;s scope it.
                </h2>
              </div>
              <p>Tell us the decision you want to improve or the process you want to digitize. We&apos;ll reply with an approach and a rough timeline.</p>
            </div>
            <div className="contact-in">
              <div className="cinfo">
                <div className="ci">
                  <div className="cik">Email</div>
                  <div className="civ">
                    <a href="mailto:sales@ebkantech.com">sales@ebkantech.com</a>
                    <small>We usually reply within one business day.</small>
                  </div>
                </div>
                <div className="ci">
                  <div className="cik">Company</div>
                  <div className="civ">
                    Ebkan Tech Pvt Ltd
                    <small>Data science · ERP · CRM solutions</small>
                  </div>
                </div>
                <div className="ci">
                  <div className="cik">Best for</div>
                  <div className="civ">
                    Forecasting, BI, churn, ERP &amp; CRM
                    <small>Supply chain, hospitals, e-commerce, solar EPC, construction.</small>
                  </div>
                </div>
              </div>
              <form className="cform" onSubmit={handleSubmit} noValidate>
                <div className="row">
                  <div className="field">
                    <label htmlFor="cf-name">Your name</label>
                    <input id="cf-name" name="name" type="text" placeholder="Jane Doe" required />
                  </div>
                  <div className="field">
                    <label htmlFor="cf-company">Company</label>
                    <input id="cf-company" name="company" type="text" placeholder="Acme Ltd" />
                  </div>
                </div>
                <div className="row">
                  <div className="field">
                    <label htmlFor="cf-email">Work email</label>
                    <input id="cf-email" name="email" type="email" placeholder="you@company.com" required />
                  </div>
                  <div className="field">
                    <label htmlFor="cf-service">Service of interest</label>
                    <select id="cf-service" name="service" defaultValue="Data science &amp; forecasting">
                      <option>Data science &amp; forecasting</option>
                      <option>Logistics / warehouse analytics</option>
                      <option>Healthcare / hospital analytics</option>
                      <option>Customer churn prediction</option>
                      <option>E-commerce sales analytics &amp; BI</option>
                      <option>Solar EPC ERP</option>
                      <option>Construction ERP</option>
                      <option>CRM solution</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="cf-msg">What do you want to achieve?</label>
                  <textarea
                    id="cf-msg"
                    name="message"
                    placeholder="A short description of your data, systems, or the outcome you're after."
                  />
                </div>
                <button className="btn submit" type="submit">
                  Send enquiry
                </button>
                <p className="form-note" style={{ color: note.color }}>
                  {note.text}
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="foot">
            <div className="foot-brand">
              <a className="brand" href="#top">
                <LogoMark />
                Ebkan Tech
              </a>
              <p>
                Ebkan Tech Pvt Ltd — data science, ERP and CRM solutions for supply chain,
                healthcare, e-commerce, solar EPC and construction.
              </p>
            </div>
            <div className="col">
              <h6>Services</h6>
              <a href="#scope">Data science &amp; ML</a>
              <a href="#scope">ERP &amp; CRM</a>
              <a href="#scope">Web &amp; app development</a>
              <a href="#scope">AI solutions</a>
              <a href="#scope">Marketing solutions</a>
            </div>
            <div className="col">
              <h6>Company</h6>
              <a href="#about">About us</a>
              <a href="#process">How we work</a>
              <a href="#industries">Industries</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="col">
              <h6>Connect</h6>
              <a href="#top">LinkedIn</a>
              <a href="mailto:sales@ebkantech.com">sales@ebkantech.com</a>
              <a href="#top">Careers</a>
            </div>
          </div>
          <div className="legal">
            <span>© 2026 Ebkan Tech Pvt Ltd</span>
            <span>Privacy · Terms · Security</span>
          </div>
        </div>
      </footer>
    </>
  );
}

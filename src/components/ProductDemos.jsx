import { useState } from "react";

/**
 * Product data and the tabbed module preview shown on each product page
 * (/products/<id>). Every figure is clearly-labelled sample data; the three
 * newest products take theirs from their product-demo PDFs.
 * Follows the same visual language as the rest of the site: hairline
 * borders, mono-set eyebrows, the --line/1px-gap grid trick used in
 * .models and .vals, and per-project accent colors applied via a CSS
 * custom property (--p-accent) rather than dynamic Tailwind classes.
 */

const STATUS = {
  "on track": "good", completed: "good", healthy: "good", approved: "good",
  active: "good", resolved: "good", renewed: "good", "in stock": "good",
  paid: "good", "high match": "good",
  delayed: "bad", "low stock": "bad", rejected: "bad", overdue: "bad",
  "at risk": "bad", critical: "bad", failed: "bad",
  "in progress": "warn", pending: "warn", reorder: "warn", open: "warn",
  review: "warn", "expiring soon": "warn", "due soon": "warn", flagged: "warn",
  scheduled: "neutral", "in transit": "neutral", queued: "neutral", draft: "neutral",
  // SolarERP10x, VantageRental5x, 10x Compliance
  collected: "good", cleared: "good", received: "good", preferred: "good", valid: "good",
  "on time": "good",
  bounced: "bad", "docs expired": "bad", "expired · blocked": "bad", "overdue 21 d": "bad",
  slow: "warn", "above card": "warn", hold: "warn", "expires in 21 d": "warn", "due in 6 days": "warn",
  deposited: "neutral", "due on dlp end": "neutral", "exception applied": "neutral",
};

function Cell({ children }) {
  const key = String(children).trim().toLowerCase();
  const kind = STATUS[key];
  if (!kind) return children;
  return <span className={`d-badge ${kind}`}>{children}</span>;
}

/* ---------------- module renderers ---------------- */

function Kpi({ data }) {
  return (
    <div className="d-kpi-grid">
      {data.map((d) => (
        <div className="d-kpi" key={d.lbl}>
          <div className="v">{d.val}</div>
          <div className="l">{d.lbl}</div>
          <div className="s">{d.sub}</div>
        </div>
      ))}
    </div>
  );
}

function Table({ columns, rows }) {
  return (
    <div className="d-table-scroll">
      <table className="d-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j}>
                  <Cell>{c}</Cell>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Chart({ chart, note }) {
  const max = Math.max(...chart.values);
  return (
    <div>
      {chart.kind === "bar" ? (
        <div className="d-bars">
          {chart.values.map((v, i) => (
            <div className="d-bar-col" key={i}>
              <div className="d-bar" style={{ height: `${(v / max) * 100}%` }} />
              <span className="d-bar-label mono">{chart.labels[i]}</span>
            </div>
          ))}
        </div>
      ) : (
        <LineChart labels={chart.labels} values={chart.values} />
      )}
      <p className="d-chart-note">{note}</p>
    </div>
  );
}

function LineChart({ labels, values }) {
  const w = 560, h = 160, pad = 18;
  const max = Math.max(...values), min = Math.min(...values);
  const range = max - min || 1;
  const pts = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return [x, y];
  });
  const path = pts.map((p, i) => (i === 0 ? "M" : "L") + p[0] + "," + p[1]).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="d-linechart" preserveAspectRatio="none">
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} className="d-axis" />
      <path d={path} className="d-line" fill="none" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3" className="d-dot" />
      ))}
      {labels.map((l, i) => (
        <text key={l} x={pts[i][0]} y={h - 2} className="d-axis-label" textAnchor="middle">
          {l}
        </text>
      ))}
    </svg>
  );
}

function RouteList({ rows }) {
  return (
    <div className="d-route-list">
      {rows.map((r) => (
        <div className="d-route" key={r.tag}>
          <span className="d-route-tag mono">{r.tag}</span>
          <span className="d-route-main">{r.main}</span>
          <span className="d-route-meta">
            {r.meta.map((m) => (
              <span key={m}>
                <Cell>{m}</Cell>
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

function Timeline({ items }) {
  return (
    <div className="d-tl">
      {items.map((it) => (
        <div className="d-tl-item" key={it.title}>
          <span className="d-tl-date mono">{it.date}</span>
          <span className="d-tl-dot" />
          <span className="d-tl-body">
            <b>{it.title}</b>
            <span>{it.detail}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

function Kanban({ stages }) {
  return (
    <div className="d-kanban">
      {stages.map((s) => (
        <div className="d-kb-col" key={s.name}>
          <div className="d-kb-head">
            <span>{s.name}</span>
            <span className="mono">{s.items.length}</span>
          </div>
          {s.items.map((it) => (
            <div className="d-kb-card" key={it.t}>
              {it.t}
              <small>{it.s}</small>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Chat({ messages }) {
  return (
    <div className="d-chat">
      {messages.map((m, i) => (
        <div className={`d-msg ${m.role}`} key={i}>
          <span className="mono tag">{m.role === "ai" ? "AI assistant" : "You"}</span>
          {m.text}
        </div>
      ))}
    </div>
  );
}

function ScoreList({ rows }) {
  return (
    <div className="d-scores">
      {rows.map((r) => (
        <div className="d-score-row" key={r.name}>
          <span className="d-score-name">
            {r.name}
            <small>{r.sub}</small>
          </span>
          <span className="d-score-track">
            <span className="d-score-fill" style={{ width: `${r.score}%` }} />
          </span>
          <span className="d-score-num mono">{r.score}</span>
        </div>
      ))}
    </div>
  );
}

function renderModule(m) {
  switch (m.type) {
    case "kpi": return <Kpi data={m.data} />;
    case "table": return <Table columns={m.columns} rows={m.rows} />;
    case "chart": return <Chart chart={m.chart} note={m.note} />;
    case "route": return <RouteList rows={m.rows} />;
    case "timeline": return <Timeline items={m.items} />;
    case "kanban": return <Kanban stages={m.stages} />;
    case "chat": return <Chat messages={m.messages} />;
    case "scorelist": return <ScoreList rows={m.rows} />;
    default: return null;
  }
}

/* ---------------- project data ---------------- */

// Exported so the product cards (DemoShowcase.jsx) read the same records.
export const PROJECTS = [
  {
    id: "warehouse-erp",
    accent: "#3E6E96",
    industry: "Warehousing & Logistics",
    name: "Warehouse Management ERP",
    blurb: "Stock, inter-warehouse movement and route intelligence in one control tower.",
    modules: [
      { name: "Overview", type: "kpi", data: [
        { val: "182,430", lbl: "Units on hand", sub: "across 6 sites" },
        { val: "6", lbl: "Active warehouses", sub: "3 regions" },
        { val: "214", lbl: "Inbound today", sub: "42 in transit" },
        { val: "78%", lbl: "Avg. space utilisation", sub: "+4% vs last month" },
      ]},
      { name: "Stock Ledger", type: "table",
        columns: ["SKU", "Description", "Warehouse", "Qty on hand", "Reorder level", "Status"],
        rows: [
          ["WH-1042", "Galvanised steel brackets", "Bengaluru North", "3,210", "1,000", "In stock"],
          ["WH-2210", "12mm HDPE pipe (6m)", "Chennai Hub", "480", "600", "Reorder"],
          ["WH-3305", "Industrial LED fixture", "Pune East", "1,120", "400", "In stock"],
          ["WH-1187", "Cable tray 300mm", "Bengaluru North", "95", "250", "Low stock"],
          ["WH-4090", "Junction boxes (IP65)", "Hyderabad Central", "2,860", "800", "In stock"],
        ]},
      { name: "Warehouse Movement", type: "table",
        columns: ["Transfer ID", "From", "To", "SKU", "Qty", "ETA", "Status"],
        rows: [
          ["TRF-3381", "Chennai Hub", "Bengaluru North", "WH-2210", "200", "Today, 6:40pm", "In transit"],
          ["TRF-3382", "Pune East", "Hyderabad Central", "WH-3305", "60", "Tomorrow, 11am", "Scheduled"],
          ["TRF-3379", "Bengaluru North", "Chennai Hub", "WH-1042", "500", "Yesterday", "Completed"],
        ]},
      { name: "BI Reports", type: "chart",
        chart: { kind: "bar", labels: ["Bengaluru N", "Chennai", "Pune E", "Hyderabad C", "Mumbai W", "Delhi N"], values: [92, 64, 78, 55, 88, 70] },
        note: "The BI dashboard turns stock movement, dwell time and dispatch accuracy into a turnover index per warehouse, so operations can see which sites are moving stock well and which are sitting on it." },
      { name: "Route Mapping", type: "route", rows: [
          { tag: "RT-08", main: "Bengaluru North → 4 retail stops → Chennai Hub", meta: ["KA-01-HT-4521", "212 km", "ETA 7:10pm", "On track"] },
          { tag: "RT-11", main: "Pune East → 2 site drops → Hyderabad Central", meta: ["MH-12-CD-9931", "560 km", "ETA tomorrow, 9am", "Scheduled"] },
          { tag: "RT-05", main: "Hyderabad Central → 6 dealer stops (local)", meta: ["TS-09-BB-1120", "88 km", "ETA 5:30pm", "Delayed"] },
        ]},
    ],
  },
  {
    id: "field-service-erp",
    accent: "#C97A1F",
    industry: "Solar EPC · Infrastructure · Networking",
    name: "Field Service ERP",
    blurb: "Material, vendor, site progress and quotation control for EPC and installation teams.",
    modules: [
      { name: "Project Dashboard", type: "kpi", data: [
        { val: "34", lbl: "Active sites", sub: "11 solar, 15 infra, 8 network" },
        { val: "46.2 MW", lbl: "Capacity under install", sub: "this quarter" },
        { val: "81%", lbl: "On-time milestone rate", sub: "trailing 90 days" },
        { val: "-3.2%", lbl: "Budget variance", sub: "favourable" },
      ]},
      { name: "Material & Vendor", type: "table",
        columns: ["Material", "Vendor", "Sub-vendor", "Ordered", "Delivered", "Status"],
        rows: [
          ["Mono PERC panels 540W", "SunSource Pvt Ltd", "—", "2,400 units", "2,400 units", "Completed"],
          ["String inverters 50kW", "VoltEdge Systems", "Apex Electricals", "40 units", "28 units", "In progress"],
          ["Mounting structure", "Metro Steelworks", "—", "18 sites", "12 sites", "In progress"],
          ["Site security cabins", "BuildRight Co.", "—", "6 units", "2 units", "Delayed"],
        ]},
      { name: "Site Progress", type: "table",
        columns: ["Site", "Phase", "% complete", "Last field update", "Photo evidence", "Status"],
        rows: [
          ["Kolar Solar Park", "Structure mounting", "62%", "2 hours ago", "14 images", "On track"],
          ["Coimbatore Tower Rollout", "Cabling", "40%", "Yesterday", "9 images", "In progress"],
          ["Nashik Distribution Site", "Commissioning", "95%", "This morning", "22 images", "On track"],
          ["Vizag Network Backbone", "Trenching", "18%", "3 days ago", "5 images", "Delayed"],
        ]},
      { name: "HR & Accounting", type: "kpi", data: [
        { val: "212", lbl: "Field staff deployed", sub: "across 34 sites" },
        { val: "96%", lbl: "Payroll on time", sub: "this cycle" },
        { val: "₹1.84 Cr", lbl: "Site expenses this month", sub: "auto-reconciled" },
        { val: "14", lbl: "Roles under RBAC", sub: "site, vendor, finance, admin" },
      ]},
      { name: "Quotation & Milestones", type: "kanban", stages: [
          { name: "Quotation drafted", items: [{ t: "Ramnagar Solar — 4MW proposal", s: "Auto-generated from BOQ" }, { t: "Coastal Networking — Phase 2", s: "Awaiting pricing rules" }] },
          { name: "Sent to client", items: [{ t: "Kolar Solar Park — Extension", s: "Sent 2 days ago" }] },
          { name: "Milestone due", items: [{ t: "Nashik — Commissioning sign-off", s: "Due in 3 days" }, { t: "Vizag — Trenching completion", s: "Overdue by 2 days" }] },
          { name: "Milestone paid", items: [{ t: "Kolar — Structure mounting", s: "Paid, invoice #INV-2291" }] },
        ]},
      { name: "AI Assistant", type: "chat", messages: [
          { role: "user", text: "Which sites are behind on their material delivery this week?" },
          { role: "ai", text: "Vizag Network Backbone is short 4 security cabins from BuildRight Co., and Coimbatore Tower Rollout has 12 of 40 inverters still pending from VoltEdge Systems — both vendor delays, not site issues." },
          { role: "user", text: "Draft a follow-up to BuildRight Co." },
          { role: "ai", text: "Drafted, referencing PO #BR-4471, the two-week gap against schedule, and the Vizag milestone date it puts at risk. It's ready in Quotation & Milestones for your review." },
        ]},
    ],
  },
  {
    // Source: SolarERP10x_Product_Demo_EbkanTech.pdf (all figures are its demo data)
    id: "solar-erp-10x",
    accent: "#E08A00",
    industry: "Solar EPC",
    name: "SolarERP10x",
    blurb: "Run every site, vendor, panel and milestone from one screen — from tender and yield modelling to field execution, project costing and handover.",
    modules: [
      { name: "Dashboard", type: "kpi", data: [
        { val: "18.6 MW", lbl: "Capacity in execution", sub: "9 live projects" },
        { val: "6 of 9", lbl: "On schedule", sub: "3 slipping" },
        { val: "4 items", lbl: "Material at risk", sub: "below reorder" },
        { val: "−1.8%", lbl: "Margin variance", sub: "vs budget" },
      ]},
      { name: "Project Lifecycle", type: "timeline", items: [
        { date: "01", title: "Tender", detail: "Opportunity logged with scope, capacity and due date" },
        { date: "02", title: "Assessment", detail: "Yield, payback and risk modelled from site data" },
        { date: "03", title: "Site survey", detail: "Structured pre-execution survey with photos" },
        { date: "04", title: "Quotation", detail: "BOQ priced, versioned and approved" },
        { date: "05", title: "Award & PO", detail: "Vendors selected, purchase orders raised from the BOQ" },
        { date: "06", title: "Material", detail: "Dispatch, transit, gate-in and GRN per site" },
        { date: "07", title: "Execution", detail: "Milestones worked, progress captured daily" },
        { date: "08", title: "Handover", detail: "Commissioning, documentation, retention released" },
      ]},
      { name: "Procurement", type: "table",
        columns: ["Vendor", "Rate", "Lead time", "Score", "Status"],
        rows: [
          ["Helios Structures", "Rate card", "12 d", "4.7", "Preferred"],
          ["Orbit Steel", "+4%", "9 d", "4.1", "Above card"],
          ["Nova Mounting", "Rate card", "21 d", "3.8", "Slow"],
          ["Ferro Fab", "—", "—", "—", "Docs expired"],
        ]},
      { name: "Billing Register", type: "table",
        columns: ["Ref", "Project / milestone", "Raised", "Value", "Status"],
        rows: [
          ["INV-0418", "Kadapa 2.4 MW · M2 structure complete", "04 Aug", "18.0% of contract", "Collected"],
          ["INV-0431", "Kadapa 2.4 MW · M3 modules installed", "22 Aug", "24.0% of contract", "Due in 6 days"],
          ["INV-0402", "Hubli rooftop · M4 commissioning", "11 Jul", "15.0% of contract", "Overdue 21 d"],
          ["RET-0388", "Nashik 1.1 MW · retention release", "—", "10.0% held", "Due on DLP end"],
        ]},
      { name: "Cost by Category", type: "chart",
        chart: { kind: "bar", labels: ["Modules", "Structure", "Inverters & BOS", "Civil & labour", "Logistics"], values: [41, 22, 17, 14, 6] },
        note: "Committed cost by category across the live portfolio, as a share of total (%)." },
      { name: "Risk Prediction", type: "scorelist", rows: [
        { name: "Kadapa 2.4 MW", sub: "Structure slipped 9 d, crew below plan, monsoon window", score: 84 },
        { name: "Hubli rooftop", sub: "Client drawing approval pending 18 d, invoice overdue", score: 71 },
        { name: "Nashik 1.1 MW", sub: "Inverter lead time extended by vendor", score: 48 },
        { name: "Solapur 3.0 MW", sub: "Ahead of plan, material fully staged", score: 19 },
      ]},
      { name: "AI Co-Pilot", type: "chat", messages: [
        { role: "user", text: "Will Kadapa hit COD if structure lands Friday?" },
        { role: "ai", text: "Only with a second crew from Monday — otherwise 04 Sep." },
      ]},
    ],
  },
  {
    // Source: VantageRental5x_Product_Demo_EbkanTech.pdf (all figures are its demo data)
    id: "vantage-rental-5x",
    accent: "#0E9F97",
    industry: "Real estate & property management — Dubai, UAE",
    name: "VantageRental5x",
    blurb: "Run every lease, vendor, appliance and dirham from one screen — rental operations for Dubai agencies, from Ejari and cheques to owner statements.",
    modules: [
      { name: "Dashboard", type: "kpi", data: [
        { val: "93.4%", lbl: "Occupancy", sub: "412 of 441 units" },
        { val: "AED 286K", lbl: "Arrears", sub: "14 tenants · 3 bounced" },
        { val: "38", lbl: "Renewals · 90 days", sub: "9 offers not yet sent" },
        { val: "57", lbl: "Open tickets", sub: "6 past SLA" },
      ]},
      { name: "Lease Lifecycle", type: "timeline", items: [
        { date: "01", title: "Listing", detail: "Unit published with its Trakheesi permit" },
        { date: "02", title: "Lead & viewing", detail: "WhatsApp lead captured, viewing booked" },
        { date: "03", title: "Offer & KYC", detail: "Emirates ID, visa & passport uploaded" },
        { date: "04", title: "Contract", detail: "Generated in AR/EN, signed online" },
        { date: "05", title: "Ejari", detail: "Registration tracked, certificate stored" },
        { date: "06", title: "Move-in", detail: "Photo check-in report, keys, DEWA" },
        { date: "07", title: "Renewal", detail: "Alerts at 120/90/60 days with index check" },
        { date: "08", title: "Move-out", detail: "Check-out compared, deposit settled" },
      ]},
      { name: "Cheque Register", type: "table",
        columns: ["Cheque", "Tenant / unit", "Bank", "Due", "Amount", "Status"],
        rows: [
          ["000418", "A. Rahman · 1204 Tower B", "Emirates NBD", "01 Oct", "AED 21,250", "Cleared"],
          ["113027", "S. Mehta · 507 Palm View", "ADCB", "03 Oct", "AED 18,000", "Bounced"],
          ["552190", "L. Novak · Villa 14 Arabian Rd", "Mashreq", "05 Oct", "AED 45,000", "Deposited"],
          ["—", "Horizon Trading · Shop G-03", "Direct debit", "07 Oct", "AED 12,600 incl. 5% VAT", "Scheduled"],
          ["309911", "K. Osei · 1810 Tower B", "FAB", "10 Oct", "AED 16,500", "Hold"],
        ]},
      { name: "Vendors", type: "table",
        columns: ["Vendor", "Avg response", "Score", "Licence"],
        rows: [
          ["CoolAir Technical", "2.1 h", "4.8", "Valid"],
          ["Frost Line Services", "3.4 h", "4.5", "Expires in 21 d"],
          ["Gulf Breeze MEP", "5.9 h", "3.9", "Valid"],
          ["Desert Chill LLC", "—", "—", "Expired · blocked"],
        ]},
      { name: "Maintenance Spend", type: "chart",
        chart: { kind: "bar", labels: ["AC / HVAC", "Plumbing", "Electrical", "Appliances", "Painting", "Pest control"], values: [184, 88, 63, 49, 35, 14] },
        note: "Maintenance spend by category, year to date (AED K). AED 21K recovered through warranty claims this year." },
      { name: "Churn Prediction", type: "scorelist", rows: [
        { name: "S. Mehta · 507 Palm View", sub: "Bounced cheque, 5 tickets in 90 days, rent above area average", score: 82 },
        { name: "Horizon Trading · Shop G-03", sub: "Late payments rising, nearby vacancy at lower rent", score: 74 },
        { name: "K. Osei · 1810 Tower B", sub: "Cheque hold request, slow AC repair last month", score: 51 },
        { name: "A. Rahman · 1204 Tower B", sub: "Pays on time, 3rd renewal, few tickets", score: 18 },
      ]},
    ],
  },
  {
    // Source: 10x-compliance-product-demo.pdf (all figures are its demo data)
    id: "compliance-10x",
    accent: "#6B5B95",
    industry: "CA & CPA firms — India · UAE · Singapore · USA",
    name: "10x Compliance",
    blurb: "Every statutory deadline, every entity, every country — from one screen. Rules engine, review workflow, client portal and billing for multi-country firms.",
    modules: [
      { name: "Dashboard", type: "kpi", data: [
        { val: "96.2%", lbl: "Compliance health", sub: "across all territories" },
        { val: "3", lbl: "Overdue filings", sub: "2 jurisdictions" },
        { val: "12", lbl: "Renewals · 30 days", sub: "4 offers not sent" },
        { val: "21", lbl: "Open tickets", sub: "4 past SLA" },
      ]},
      { name: "Engagement Lifecycle", type: "timeline", items: [
        { date: "01", title: "Enquiry", detail: "Client or referral captured, first call logged" },
        { date: "02", title: "Proposal & fee", detail: "Scope, fee and engagement letter drafted" },
        { date: "03", title: "KYC & signature", detail: "Documents collected, letter e-signed" },
        { date: "04", title: "Entity setup", detail: "Entities tagged, rule pack assigned" },
        { date: "05", title: "Obligation generated", detail: "Due date computed from the rules engine" },
        { date: "06", title: "Work assigned", detail: "Associate → manager → partner review" },
        { date: "07", title: "Filed & logged", detail: "Submitted, event logged, client notified" },
        { date: "08", title: "Next period", detail: "Next obligation opens automatically" },
      ]},
      { name: "Review & Documents", type: "table",
        columns: ["Document · GSTR-3B Sep 2026", "Requested", "Received", "Status"],
        rows: [
          ["Sales register", "01 Oct", "02 Oct", "Received"],
          ["Purchase register", "01 Oct", "—", "Overdue"],
          ["Bank statement", "01 Oct", "03 Oct", "Received"],
          ["E-way bill summary", "05 Oct", "—", "Pending"],
        ]},
      { name: "Rules Engine", type: "table",
        columns: ["TDS · India · v2026.07", "Due", "Filed", "Status"],
        rows: [
          ["Jul 2026", "30 Aug", "28 Aug", "On time"],
          ["Aug 2026", "30 Sep", "—", "Open"],
          ["Mar 2026", "30 Apr", "29 Apr", "Exception applied"],
        ]},
      { name: "Billing", type: "table",
        columns: ["Invoice", "Client", "Entity", "Due", "Amount", "Status"],
        rows: [
          ["INV-2026-0418", "Kaveri Foods", "India", "01 Oct", "₹ 42,500", "Cleared"],
          ["INV-2026-0521", "Zephyr Mobility", "UAE", "03 Oct", "AED 18,000", "Overdue"],
          ["INV-2026-0602", "Al Noor Trading", "UAE", "05 Oct", "AED 12,600 incl. 5% VAT", "Scheduled"],
          ["INV-2026-0447", "MyDojo Inc.", "USA", "07 Oct", "$3,200", "Hold"],
          ["INV-2026-0398", "Zephyr Mobility", "Singapore", "10 Oct", "S$2,450", "Deposited"],
        ]},
      { name: "Filings by Territory", type: "chart",
        chart: { kind: "bar", labels: ["India", "UAE", "Singapore", "USA"], values: [184, 88, 34, 21] },
        note: "Filings by territory, year to date." },
      { name: "Filing Risk", type: "scorelist", rows: [
        { name: "Kaveri Foods · India", sub: "2 documents missing, associate on leave", score: 82 },
        { name: "Zephyr Mobility · UAE", sub: "Late-document history, new rule version", score: 74 },
        { name: "Al Noor Trading · UAE", sub: "First filing under new CT rule", score: 51 },
        { name: "MyDojo Inc. · USA", sub: "On time last 6 filings, docs complete", score: 18 },
      ]},
    ],
  },
];

/* ---------------- module preview (product pages) ---------------- */

/**
 * The tabbed module preview for one product, shown on its page at
 * /products/<id>. Every screen uses clearly-labelled sample data.
 */
export function ModulePreview({ project }) {
  const [tab, setTab] = useState(0);
  const current = project.modules[Math.min(tab, project.modules.length - 1)];
  return (
    <div className="demo-body mp" style={{ "--p-accent": project.accent }}>
      <div className="demo-tabs" role="tablist" aria-label={`${project.name} modules`}>
        {project.modules.map((m, i) => (
          <button
            key={m.name}
            type="button"
            role="tab"
            aria-selected={tab === i}
            className={`demo-tab ${tab === i ? "is-active" : ""}`}
            onClick={() => setTab(i)}
          >
            {m.name}
          </button>
        ))}
      </div>
      <div className="demo-panel" role="tabpanel">{renderModule(current)}</div>
      <p className="demo-disclaimer mono">Sample data shown for demonstration only.</p>
    </div>
  );
}

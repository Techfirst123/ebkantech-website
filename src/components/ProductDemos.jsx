import { useId, useState } from "react";
import { motion } from "framer-motion";
import { trackEvent } from "../analytics";

/**
 * Live product demos — five projects currently in build. Each one opens
 * into a dark dashboard mockup — like a real product screenshot rather
 * than a section of the page — showing the full operational cycle the
 * platform runs (not just an isolated chart), operational KPIs, one BI
 * chart, and the business impact after data-science optimisation.
 * Colors here are a fixed dark palette independent of the site's
 * light/dark toggle, since this is meant to read as an embedded product
 * screenshot. Ends with a CTA straight to the enquiry form.
 */

function Cycle({ stages, accent }) {
  return (
    <div className="dd-cycle-wrap">
      <div className="dd-cycle">
        {stages.map((s, i) => (
          <div className="dd-cycle-item" key={s}>
            <div className="dd-cycle-node" style={{ borderColor: accent, color: accent }}>
              <span className="dd-cycle-num mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="dd-cycle-label">{s}</span>
            </div>
            {i < stages.length - 1 && (
              <svg className="dd-cycle-arrow" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            )}
          </div>
        ))}
      </div>
      <div className="dd-cycle-loop">
        <svg viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8">
          <path d="M4 4v5h5M20 20v-5h-5" />
          <path d="M4.5 15a8 8 0 0 0 14 4.5M19.5 9A8 8 0 0 0 5.5 4.5" />
        </svg>
        <span>Every cycle feeds the next — outcomes retrain the model that runs the next round</span>
      </div>
    </div>
  );
}

function Kpi({ data, accent }) {
  return (
    <div className="dd-kpi-grid">
      {data.map((d) => (
        <div className="dd-kpi" key={d.lbl}>
          <div className="v">{d.val}</div>
          <div className="l">{d.lbl}</div>
          <div className="s" style={{ color: accent }}>{d.sub}</div>
        </div>
      ))}
    </div>
  );
}

function Impact({ stat, label, detail, accent }) {
  return (
    <div className="dd-impact" style={{ borderColor: `${accent}55`, background: `${accent}14` }}>
      <div className="dd-impact-stat" style={{ color: accent }}>{stat}</div>
      <div className="dd-impact-copy">
        <div className="dd-impact-label">{label}</div>
        <p>{detail}</p>
      </div>
    </div>
  );
}

function BarChart({ labels, values, accent }) {
  const max = Math.max(...values);
  return (
    <div className="dd-bars">
      {values.map((v, i) => (
        <div className="dd-bar-col" key={i}>
          <div className="dd-bar" style={{ height: `${(v / max) * 100}%`, background: accent }} />
          <span className="dd-bar-label mono">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

function LineChart({ labels, values, accent }) {
  const w = 560, h = 150, pad = 18;
  const max = Math.max(...values), min = Math.min(...values);
  const range = max - min || 1;
  const pts = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return [x, y];
  });
  const path = pts.map((p, i) => (i === 0 ? "M" : "L") + p[0] + "," + p[1]).join(" ");
  const area = `${path} L${pts[pts.length - 1][0]},${h - pad} L${pts[0][0]},${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="dd-linechart" preserveAspectRatio="none">
      <path d={area} fill={`${accent}22`} stroke="none" />
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} className="dd-axis" />
      <path d={path} stroke={accent} strokeWidth="2" fill="none" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={accent} />
      ))}
      {labels.map((l, i) => (
        <text key={l} x={pts[i][0]} y={h - 2} className="dd-axis-label" textAnchor="middle">
          {l}
        </text>
      ))}
    </svg>
  );
}

function BiChart({ chart, note, accent }) {
  return (
    <div>
      <div className="dd-eyebrow mono">BI report — live view</div>
      {chart.kind === "bar" ? (
        <BarChart labels={chart.labels} values={chart.values} accent={accent} />
      ) : (
        <LineChart labels={chart.labels} values={chart.values} accent={accent} />
      )}
      <p className="dd-chart-note">{note}</p>
    </div>
  );
}

/* ---------------- project data ---------------- */

const PROJECTS = [
  {
    id: "warehouse-erp",
    accent: "#3E6E96",
    accentDark: "#6FA8D6",
    industry: "Warehousing & Logistics",
    name: "Warehouse Management ERP",
    blurb: "Stock, inter-warehouse movement and route intelligence in one control tower.",
    cycle: ["Inbound receiving", "Stock allocation", "Warehouse movement", "Route dispatch", "BI demand forecast"],
    kpis: [
      { val: "182,430", lbl: "Units on hand", sub: "across 6 sites" },
      { val: "78%", lbl: "Space utilisation", sub: "+4% vs last month" },
      { val: "94%", lbl: "Dispatch accuracy", sub: "trailing 30 days" },
      { val: "6", lbl: "Active warehouses", sub: "3 regions" },
    ],
    impact: {
      stat: "19%",
      label: "Fewer stockouts after demand forecasting",
      detail: "BI-driven reorder points and route optimisation cut stockouts 19% and trimmed average dispatch time by 12% over the last two quarters.",
    },
    chart: { kind: "bar", labels: ["Bengaluru N", "Chennai", "Pune E", "Hyderabad C", "Mumbai W", "Delhi N"], values: [92, 64, 78, 55, 88, 70] },
    chartNote: "Stock movement, dwell time and dispatch accuracy rolled into one turnover index per warehouse, so operations can see which sites are moving stock well and which are sitting on it.",
  },
  {
    id: "field-service-erp",
    accent: "#C97A1F",
    accentDark: "#E3A84F",
    industry: "Solar EPC · Infrastructure · Networking",
    name: "Field Service ERP",
    blurb: "Material, vendor, site progress and quotation control for EPC and installation teams.",
    cycle: ["Quotation", "Material & vendor procurement", "Site execution", "Progress tracking", "Milestone billing"],
    kpis: [
      { val: "34", lbl: "Active sites", sub: "11 solar, 15 infra, 8 network" },
      { val: "46.2 MW", lbl: "Capacity under install", sub: "this quarter" },
      { val: "81%", lbl: "On-time milestone rate", sub: "trailing 90 days" },
      { val: "-3.2%", lbl: "Budget variance", sub: "favourable" },
    ],
    impact: {
      stat: "14%",
      label: "Fewer schedule overruns after AI progress analytics",
      detail: "Cross-referencing site photos, vendor deliveries and milestone dates automatically flags at-risk sites early, cutting schedule overruns 14% and material cost 9%.",
    },
    chart: { kind: "line", labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"], values: [64, 68, 71, 75, 79, 81] },
    chartNote: "On-time milestone rate trending up as material and vendor delays get flagged before they hit the critical path, not after.",
  },
  {
    id: "rental-crm",
    accent: "#2C6E6A",
    accentDark: "#4FB3AC",
    industry: "Multi-channel Product & Rental Business",
    name: "Sales & Rental CRM",
    blurb: "Recurring billing, client issues and churn intelligence for a rental-based product business.",
    cycle: ["Multi-channel lead capture", "Subscription & billing", "Issue resolution", "Churn & demand forecast", "Channel re-targeting"],
    kpis: [
      { val: "₹18.4L", lbl: "Recurring revenue", sub: "this month" },
      { val: "3.1%", lbl: "Monthly churn", sub: "-1.7pt vs Apr" },
      { val: "96%", lbl: "Issues resolved in SLA", sub: "trailing 30 days" },
      { val: "412", lbl: "Active subscriptions", sub: "across 5 channels" },
    ],
    impact: {
      stat: "22%",
      label: "Revenue uplift after channel-mix optimisation",
      detail: "Shifting spend toward the channels the BI report showed converting best, plus earlier churn flags, lifted recurring revenue 22% and cut churn by 1.7 points.",
    },
    chart: { kind: "line", labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"], values: [4.8, 4.2, 5.1, 3.9, 3.4, 3.1] },
    chartNote: "The same model feeding churn also drives demand and stock forecasting — flagging which products are likely to see a spike in rental requests next.",
  },
  {
    id: "finance-crm",
    accent: "#6B5B95",
    accentDark: "#A493D1",
    industry: "Finance — Dubai, UAE",
    name: "B2B Loan Screening CRM",
    blurb: "Rule-based credit screening with AI-assisted risk scoring for B2B loan approval.",
    cycle: ["Application intake", "Rule-based screening", "AI risk scoring", "Committee approval", "Portfolio monitoring"],
    kpis: [
      { val: "1.8", lbl: "Avg. DSCR of approved book", sub: "up from 1.2 in 2021" },
      { val: "68%", lbl: "Faster screening turnaround", sub: "vs manual review" },
      { val: "128", lbl: "Applications this quarter", sub: "AED 34.6M requested" },
      { val: "11%", lbl: "Fewer defaults", sub: "trailing cohort" },
    ],
    impact: {
      stat: "3x",
      label: "Faster screening after AI risk scoring",
      detail: "Automatic parsing of financials against the rule set turns a multi-day manual review into a same-day decision, with 11% fewer defaults in the approved cohort.",
    },
    chart: { kind: "line", labels: ["2021", "2022", "2023", "2024", "2025"], values: [1.2, 1.4, 1.35, 1.6, 1.8] },
    chartNote: "Three years of submitted financials parsed automatically and checked against the rule set, rather than read line by line by an analyst.",
  },
  {
    id: "gym-portal",
    accent: "#B4503A",
    accentDark: "#E58366",
    industry: "Fitness — Dubai, UAE",
    name: "Multi-branch Gym Operations Portal",
    blurb: "Subscriptions, leads and staffing across 10 branches, with member engagement built in.",
    cycle: ["Lead generation", "Membership conversion", "Engagement & coaching plans", "Renewal & retention", "Feedback loop"],
    kpis: [
      { val: "6,840", lbl: "Active members", sub: "across 10 branches" },
      { val: "4.1%", lbl: "Monthly churn", sub: "-0.6pt vs last month" },
      { val: "AED 1.62M", lbl: "Subscription revenue", sub: "this month" },
      { val: "27%", lbl: "Lead conversion", sub: "trailing 30 days" },
    ],
    impact: {
      stat: "27%",
      label: "More converted leads after engagement scoring",
      detail: "Routing leads by channel performance and pairing new members with a motivational plan lifted conversion 27% and pulled monthly churn down 0.6 points.",
    },
    chart: { kind: "line", labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"], values: [4.1, 4.2, 4.0, 4.4, 4.5, 4.6] },
    chartNote: "Feedback scores tracked alongside motivational-plan enrolment — members on an active plan show noticeably higher satisfaction and renewal rates.",
  },
];

/* ---------------- card + accordion ---------------- */

function DemoCard({ project, isOpen, onToggle }) {
  const panelId = useId();
  const a = project.accentDark;

  const handleToggle = () => {
    if (!isOpen) {
      trackEvent("select_content", {
        content_type: "product_demo_open",
        item_id: project.id,
        item_name: project.name,
      });
    }
    onToggle(project.id);
  };

  return (
    <div className="demo-card" style={{ "--p-accent": project.accent }}>
      <button
        type="button"
        className="demo-head"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="demo-dot" />
        <span className="demo-titles">
          <span className="mono demo-industry">{project.industry}</span>
          <span className="demo-name">{project.name}</span>
        </span>
        <span className="demo-blurb">{project.blurb}</span>
        <span className={`demo-chev ${isOpen ? "open" : ""}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>

      <motion.div
        id={panelId}
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: "hidden" }}
      >
        <div className="demo-body">
          <div className="dd-shell">
            <div className="dd-titlebar">
              <span className="dd-dots">
                <i /><i /><i />
              </span>
              <span className="dd-url mono">
                dashboard.ebkantech.com/{project.id}
              </span>
            </div>

            <div className="dd-inner">
              <div className="dd-head-row">
                <div>
                  <div className="dd-eyebrow mono">Full business cycle</div>
                  <h4 className="dd-title">{project.name}</h4>
                </div>
              </div>

              <Cycle stages={project.cycle} accent={a} />
              <Kpi data={project.kpis} accent={a} />
              <BiChart chart={project.chart} note={project.chartNote} accent={a} />
              <Impact
                stat={project.impact.stat}
                label={project.impact.label}
                detail={project.impact.detail}
                accent={a}
              />
            </div>
          </div>

          <a
            href="#contact"
            className="demo-cta"
            onClick={() =>
              trackEvent("select_content", {
                content_type: "product_demo_enquiry",
                item_id: project.id,
                item_name: project.name,
              })
            }
          >
            Enquire about this module
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <p className="demo-disclaimer mono">Sample data shown for demonstration only.</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProductDemos() {
  const [openId, setOpenId] = useState(PROJECTS[0].id);
  const toggle = (id) => setOpenId((cur) => (cur === id ? null : id));

  return (
    <div className="demo-list">
      {PROJECTS.map((p) => (
        <DemoCard key={p.id} project={p} isOpen={openId === p.id} onToggle={toggle} />
      ))}
    </div>
  );
}

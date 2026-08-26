import { useId, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Building2, Contact, BarChart3, Bot, ShoppingCart } from "lucide-react";

/**
 * Same premium accordion-card system as ScopeCards.jsx, reused here for
 * "Delivered work" — one card per shipped project. See ScopeCards.jsx for
 * the rationale behind the inline-style color handling (Tailwind can't
 * scan dynamically-built class names, so per-project accent colors are
 * applied via `style`, never interpolated into `className`).
 */
const REST_BORDER = "#E2E1DD";
const REST_TEXT = "#2A2A28";
const CARD_BG = "#FFFFFF";

const PROJECTS = [
  {
    id: "solar-epc-erp",
    name: "Solar EPC ERP",
    accent: "#F59E0B", // amber
    Icon: Sun,
    description:
      "Project costing, procurement, and field progress in one system connecting finance, warehouse, and site.",
    facts: ["Costing & Budgets", "Vendor & Material", "Site Progress", "Commissioning"],
  },
  {
    id: "construction-erp",
    name: "Construction ERP",
    accent: "#14B8A6", // teal
    Icon: Building2,
    description:
      "BOQ, subcontractors, inventory, and live budget-vs-actual across every project.",
    facts: ["BOQ & Estimation", "Subcontractor Mgmt", "Inventory & Stores", "Progress Billing"],
  },
  {
    id: "crm",
    name: "CRM",
    accent: "#6366F1", // indigo
    Icon: Contact,
    description:
      "A sales CRM tying pipeline, lead scoring, and reporting directly to how the team actually sells.",
    facts: ["Pipeline Tracking", "Lead Scoring", "Sales Reporting"],
  },
  {
    id: "business-intelligence",
    name: "Business Intelligence",
    accent: "#8B5CF6", // violet
    Icon: BarChart3,
    description:
      "Live dashboards and forecasting models that turn raw CRM/ERP data into decisions teams act on.",
    facts: ["Live Dashboards", "Forecasting Models", "Data Integration"],
  },
  {
    id: "ai-assistant",
    name: "AI Assistant",
    accent: "#0EA5E9", // sky
    Icon: Bot,
    description:
      "A conversational assistant handling customer queries and internal workflows around the clock.",
    facts: ["24/7 Support", "Workflow Automation", "Natural Language"],
  },
  {
    id: "ecommerce-website",
    name: "E-commerce Website",
    accent: "#F0654A", // coral
    Icon: ShoppingCart,
    description:
      "A storefront with catalog, cart, and payments wired directly into inventory and operations.",
    facts: ["Storefront & Catalog", "Payments", "Inventory Sync"],
  },
];

function PlusIndicator({ color, isOpen, isHovered }) {
  const rotation = isOpen ? 45 : isHovered ? 12 : 0;
  return (
    <span
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-[border-color,transform] duration-300 ease-out"
      style={{ borderColor: color, transform: `rotate(${rotation}deg)` }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 1v10M1 6h10" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function ProjectCard({ project, isOpen, onToggle }) {
  const [isHovered, setIsHovered] = useState(false);
  const panelId = useId();
  const active = isOpen || isHovered;
  const activeColor = active ? project.accent : REST_TEXT;
  const borderColor = active ? project.accent : REST_BORDER;
  const Icon = project.Icon;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-[20px] border bg-white transition-[border-color,box-shadow,transform] duration-300 ease-out"
      style={{
        borderColor,
        background: CARD_BG,
        transform: active ? "translateY(-4px)" : "translateY(0)",
        boxShadow: active
          ? `0 16px 32px -20px ${project.accent}4D`
          : "0 1px 2px rgba(0,0,0,0.02)",
      }}
    >
      <button
        type="button"
        onClick={() => onToggle(project.id)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full flex-col gap-5 p-8 text-left"
      >
        <div className="flex items-start justify-between">
          <Icon
            className="h-7 w-7 transition-colors duration-300 ease-out"
            strokeWidth={1.6}
            style={{ color: activeColor }}
          />
          <PlusIndicator color={activeColor} isOpen={isOpen} isHovered={isHovered} />
        </div>

        <h3
          className="font-sans text-xl font-medium leading-snug transition-colors duration-300 ease-out"
          style={{ color: activeColor }}
        >
          {project.name}
        </h3>
      </button>

      <motion.div
        id={panelId}
        role="region"
        aria-hidden={!isOpen}
        aria-label={`${project.name} details`}
        {...(!isOpen ? { inert: "" } : {})}
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: "hidden" }}
      >
        <div className="px-8 pb-8">
          <motion.p
            initial={false}
            animate={
              isOpen
                ? { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
                : { opacity: 0, y: 6, transition: { duration: 0.15 } }
            }
            className="font-sans text-sm leading-relaxed"
            style={{ color: `${REST_TEXT}B3` }}
          >
            {project.description}
          </motion.p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.facts.map((fact, i) => (
              <motion.span
                key={fact}
                initial={false}
                animate={
                  isOpen
                    ? { opacity: 1, y: 0, transition: { duration: 0.3, delay: i * 0.06, ease: "easeOut" } }
                    : { opacity: 0, y: 6, transition: { duration: 0.15 } }
                }
                className="rounded-full px-3.5 py-1.5 font-sans text-xs"
                style={{ color: REST_TEXT, background: `${project.accent}14` }}
              >
                {fact}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function DeliveredCards() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId((current) => (current === id ? null : id));

  return (
    <div className="rounded-[28px] p-6 sm:p-8" style={{ background: "#F7F7F5" }}>
      <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isOpen={openId === project.id}
            onToggle={toggle}
          />
        ))}
      </div>
    </div>
  );
}

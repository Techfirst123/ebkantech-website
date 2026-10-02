import { useId, useState } from "react";
import { motion } from "framer-motion";
import TechMarquee from "./TechMarquee";

/**
 * Premium accordion-card redesign of "Scope of business".
 *
 * Design tokens (deliberately neutral/premium, distinct from the rest of
 * the site's warm-paper theme):
 *   canvas   #F7F7F5  -- very light neutral grey
 *   card     #FFFFFF
 *   border   #E2E1DD  -- muted grey, barely visible at rest
 *   text     #2A2A28  -- charcoal, not pure black
 *
 * Colors that depend on a per-category accent are applied via inline
 * `style` (not Tailwind className string interpolation) since Tailwind's
 * JIT scanner can't see dynamically-built class names — only literal,
 * static utility classes are used in className props here.
 */
const REST_BORDER = "#E2E1DD";
const REST_TEXT = "#2A2A28";
const CARD_BG = "#FFFFFF";

const CATEGORIES = [
  {
    id: "data-science",
    name: "Data Science",
    accent: "#6366F1", // indigo
    icon: (
      <>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
        <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
      </>
    ),
    subs: [
      "Supply Chain & Demand Forecasting",
      "Logistics & Route Optimization",
      "Hospital & Healthcare Analytics",
      "Warehouse & Inventory Intelligence",
      "Customer Churn Prediction",
      "E-commerce Sales Analytics & BI",
    ],
  },
  {
    id: "erp",
    name: "ERP",
    accent: "#14B8A6", // teal
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    subs: ["Solar EPC ERP", "Construction ERP", "CRM Solutions"],
  },
  {
    id: "web",
    name: "Web",
    accent: "#F59E0B", // amber
    icon: <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />,
    subs: ["Business Websites", "Web Applications", "Mobile Apps", "E-commerce Stores"],
  },
  {
    id: "ai",
    name: "AI",
    accent: "#8B5CF6", // violet
    icon: (
      <>
        <path d="M12 3l1.8 4.7L18 9l-4.2 1.3L12 15l-1.8-4.7L6 9l4.2-1.3L12 3Z" />
        <path d="M18.5 14l.8 2 .7 1.9-2.1-.6-2.1.6.9-2-.9-1.9 2.1.6Z" />
      </>
    ),
    subs: [
      "AI Chatbots & Assistants",
      "Predictive Analytics",
      "Computer Vision",
      "Generative AI & LLM Automation",
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    accent: "#F0654A", // coral
    icon: (
      <>
        <path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1Z" />
        <path d="M16 8a5 5 0 0 1 0 8" />
      </>
    ),
    subs: [
      "SEO & Content",
      "Performance Campaigns",
      "Social Media Management",
      "Marketing Analytics & CRO",
    ],
  },
  {
    id: "network-cloud-security",
    name: "Network & Cloud Security",
    accent: "#3E5C76", // slate-blue
    icon: (
      <>
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    subs: [
      "Firewall & Network Security",
      "Cloud Security (Azure/AWS)",
      "DevOps & Infrastructure Automation",
    ],
    showTechMarquee: true,
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

function CategoryCard({ category, isOpen, onToggle }) {
  const [isHovered, setIsHovered] = useState(false);
  const panelId = useId();
  const active = isOpen || isHovered;
  const activeColor = active ? category.accent : REST_TEXT;
  const borderColor = active ? category.accent : REST_BORDER;

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
          ? `0 16px 32px -20px ${category.accent}4D`
          : "0 1px 2px rgba(0,0,0,0.02)",
      }}
    >
      <button
        type="button"
        onClick={() => onToggle(category.id)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full flex-col gap-5 p-8 text-left"
      >
        <div className="flex items-start justify-between">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke={activeColor}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7 transition-colors duration-300 ease-out"
          >
            {category.icon}
          </svg>
          <PlusIndicator color={activeColor} isOpen={isOpen} isHovered={isHovered} />
        </div>

        <h3
          className="font-sans text-xl font-medium leading-snug transition-colors duration-300 ease-out"
          style={{ color: activeColor }}
        >
          {category.name}
        </h3>
      </button>

      <motion.div
        id={panelId}
        role="region"
        aria-hidden={!isOpen}
        aria-label={`${category.name} sub-categories`}
        {...(!isOpen ? { inert: "" } : {})}
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: "hidden" }}
      >
        <div className="px-8 pb-8">
          <div className="flex flex-wrap gap-2">
            {category.subs.map((sub, i) => (
              <motion.span
                key={sub}
                initial={false}
                animate={
                  isOpen
                    ? { opacity: 1, y: 0, transition: { duration: 0.3, delay: i * 0.06, ease: "easeOut" } }
                    : { opacity: 0, y: 6, transition: { duration: 0.15 } }
                }
                className="rounded-full px-3.5 py-1.5 font-sans text-xs"
                style={{ color: REST_TEXT, background: `${category.accent}14` }}
              >
                {sub}
              </motion.span>
            ))}
          </div>

          {category.showTechMarquee && (
            <div className="mt-6">
              <TechMarquee />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function ScopeCards() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId((current) => (current === id ? null : id));

  return (
    <div
      className="rounded-[28px] p-6 sm:p-8"
      style={{ background: "#F7F7F5" }}
    >
      <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            isOpen={openId === category.id}
            onToggle={toggle}
          />
        ))}
      </div>
    </div>
  );
}

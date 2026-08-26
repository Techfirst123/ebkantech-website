import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, HeartPulse, ShoppingBag, Sun, HardHat } from "lucide-react";

/**
 * Same premium card system as ScopeCards.jsx / DeliveredCards.jsx, reused
 * here for "Industries we serve" so all three sections read as one design
 * system. The only behavioral difference: reveal is hover-driven (no
 * click/accordion) since each card just surfaces a single description
 * line, not a sub-list.
 */
const REST_BORDER = "#E2E1DD";
const REST_TEXT = "#2A2A28";
const CARD_BG = "#FFFFFF";

const INDUSTRIES = [
  {
    id: "supply-chain",
    name: "Supply Chain",
    accent: "#14B8A6", // teal
    Icon: Truck,
    description: "Forecasting and routing that keep goods moving on time.",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    accent: "#F0654A", // coral
    Icon: HeartPulse,
    description: "Systems built for patient data and compliance.",
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    accent: "#F59E0B", // amber
    Icon: ShoppingBag,
    description: "Storefronts and analytics tuned for conversion.",
  },
  {
    id: "solar-epc",
    name: "Solar EPC",
    accent: "#C9A227", // gold
    Icon: Sun,
    description: "ERP built for engineering, procurement, and site work.",
  },
  {
    id: "construction",
    name: "Construction",
    accent: "#5B6B8C", // slate-blue
    Icon: HardHat,
    description: "Budgets, BOQ, and progress tracked in real time.",
  },
];

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function IndustryCard({ industry }) {
  const [active, setActive] = useState(false);
  const Icon = industry.Icon;
  const color = active ? industry.accent : REST_TEXT;
  const borderColor = active ? industry.accent : REST_BORDER;

  return (
    <motion.div
      variants={cardVariants}
      tabIndex={0}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className="rounded-[20px] border bg-white text-center outline-none transition-[border-color,box-shadow,transform] duration-300 ease-out"
      style={{
        borderColor,
        background: CARD_BG,
        transform: active ? "translateY(-4px)" : "translateY(0)",
        boxShadow: active
          ? `0 16px 32px -20px ${industry.accent}4D`
          : "0 1px 2px rgba(0,0,0,0.02)",
      }}
    >
      <div className="flex flex-col items-center gap-4 p-8">
        <Icon
          className="h-7 w-7 transition-colors duration-300 ease-out"
          strokeWidth={1.6}
          style={{ color }}
        />
        <h3
          className="font-sans text-lg font-medium leading-snug transition-colors duration-300 ease-out"
          style={{ color }}
        >
          {industry.name}
        </h3>

        <motion.div
          initial={false}
          animate={
            active
              ? { height: "auto", opacity: 1, marginTop: 0 }
              : { height: 0, opacity: 0, marginTop: -16 }
          }
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ overflow: "hidden" }}
          className="w-full"
        >
          <p
            className="font-sans text-xs leading-relaxed"
            style={{ color: `${REST_TEXT}B3` }}
          >
            {industry.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function IndustryCards() {
  return (
    <div className="rounded-[28px] p-6 sm:p-8" style={{ background: "#F7F7F5" }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={gridVariants}
        className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-5"
      >
        {INDUSTRIES.map((industry) => (
          <IndustryCard key={industry.id} industry={industry} />
        ))}
      </motion.div>
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView, animate } from "framer-motion";
import {
  Database,
  Workflow,
  Cpu,
  LayoutDashboard,
  FileStack,
  TrendingUp,
  BarChart3,
  Boxes,
  Contact,
  FileSpreadsheet,
  Building2,
  Merge,
  FileText,
} from "lucide-react";

/**
 * DESIGN TOKENS
 * bg        slate-950/charcoal, dot-grid texture, ambient blue/teal glow
 * accent    sky-400   -- "electric blue": engine, forecast, CTA
 * secondary teal-400  -- "data flow": pipeline, history, integration
 * text      slate-100 / slate-400 (muted)
 * type      Inter (see @theme --font-sans in ebkan.css) + font-mono for data labels
 *
 * Easing: a fixed ease-out-cubic curve everywhere so motion reads as
 * engineered, not springy — enterprise tone, not a consumer app.
 */
const EASE = [0.33, 1, 0.68, 1];

const nodes = [
  { icon: Database, label: "CRM / ERP Data" },
  { icon: Workflow, label: "Data Pipeline" },
  { icon: Cpu, label: "Analytics Engine" },
  { icon: LayoutDashboard, label: "Live Dashboard" },
];

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

/* Shared trigger: plays an entrance animation on hover AND every time the
   element scrolls into view (not just once), per the "live" chart brief. */
function useReplayTrigger() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const controls = useAnimation();

  const play = useCallback(() => {
    controls.set("hidden");
    controls.start("visible");
  }, [controls]);

  useEffect(() => {
    if (inView) play();
  }, [inView, play]);

  return { ref, controls, onMouseEnter: play };
}

function FlowDiagram() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative w-full py-16">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {nodes.map((n, i) => (
          <motion.div
            key={n.label}
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
            className="relative z-10 flex flex-col items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/70 px-3 py-5 text-center shadow-[0_0_0_1px_rgba(56,189,248,0.05)]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 ring-1 ring-inset ring-sky-400/25">
              <n.icon className="h-5 w-5 text-sky-400" strokeWidth={1.75} />
            </div>
            <span className="font-mono text-[0.68rem] uppercase tracking-wide text-slate-400">
              {n.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* connecting line + traveling gradient pulse, spans the row */}
      <svg
        className="pointer-events-none absolute left-0 top-[52px] hidden w-full sm:block"
        height="6"
        viewBox="0 0 100 1"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="bi-flow-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>
          <radialGradient id="bi-pulse-grad">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="45%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
          </radialGradient>
        </defs>
        <line
          x1="14" y1="0.5" x2="86" y2="0.5"
          stroke="url(#bi-flow-grad)"
          strokeWidth="0.3"
          strokeDasharray="1.6 1.6"
          opacity="0.5"
        />
        {inView && (
          <motion.circle
            cy="0.5" r="1.6"
            fill="url(#bi-pulse-grad)"
            initial={{ cx: 14, opacity: 0 }}
            animate={{ cx: [14, 86], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
          />
        )}
      </svg>
    </div>
  );
}

function Counter({ target, suffix = "", decimals = 0, size = "lg" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.2,
      ease: EASE,
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, target]);

  const display =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString();

  return (
    <span
      ref={ref}
      className={`font-mono font-semibold text-slate-100 ${
        size === "sm" ? "text-lg" : "text-2xl"
      }`}
    >
      {display}
      {suffix}
    </span>
  );
}

/* Label + counter pairing used in the Real-Time Dashboards stat stack. */
function Stat({ target, suffix, decimals, label }) {
  return (
    <div className="flex items-baseline gap-2">
      <Counter target={target} suffix={suffix} decimals={decimals} size="sm" />
      <span className="text-[0.68rem] text-slate-500">{label}</span>
    </div>
  );
}

/* Four source icons scattered at the card's corners, each drawing a thin
   line into a single glowing hub — sources merging into one system. */
const integrationSources = [
  { Icon: Contact, x: 14, y: 12, corner: "left-0 top-0" },
  { Icon: FileSpreadsheet, x: 186, y: 12, corner: "right-0 top-0" },
  { Icon: Database, x: 14, y: 88, corner: "left-0 bottom-0" },
  { Icon: Building2, x: 186, y: 88, corner: "right-0 bottom-0" },
];
const HUB = { x: 100, y: 50 };

function IntegrationHub() {
  const { ref, controls, onMouseEnter } = useReplayTrigger();

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 0.85, transition: { duration: 0.5, ease: EASE } },
  };
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: EASE } },
  };
  const hubVariants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: EASE, delay: 0.55 },
    },
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={onMouseEnter}
      initial="hidden"
      animate={controls}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="relative mt-4 h-28"
    >
      <svg viewBox="0 0 200 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="hub-line-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        {integrationSources.map((s, i) => (
          <motion.line
            key={i}
            x1={s.x} y1={s.y} x2={HUB.x} y2={HUB.y}
            stroke="url(#hub-line-grad)"
            strokeWidth="1.4"
            strokeDasharray="3 2"
            strokeLinecap="round"
            variants={lineVariants}
          />
        ))}
      </svg>

      {integrationSources.map((s, i) => (
        <motion.div
          key={i}
          variants={iconVariants}
          className={`absolute ${s.corner} flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800`}
        >
          <s.Icon className="h-4 w-4 text-slate-400" strokeWidth={1.75} />
        </motion.div>
      ))}

      <motion.div
        variants={hubVariants}
        className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-sky-400/10 ring-2 ring-sky-400/50 shadow-[0_0_22px_4px_rgba(56,189,248,0.4)]"
      >
        <Merge className="h-5 w-5 text-sky-400" strokeWidth={1.75} />
      </motion.div>
    </motion.div>
  );
}

/* Bars grow from the baseline, staggered — replays on hover + each scroll-in. */
function BarChart({ values, color = "#2dd4bf" }) {
  const { ref, controls, onMouseEnter } = useReplayTrigger();
  const barVariants = {
    hidden: { scaleY: 0 },
    visible: { scaleY: 1, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={onMouseEnter}
      initial="hidden"
      animate={controls}
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      className="mt-4 flex h-16 items-end gap-1.5"
    >
      {values.map((h, i) => (
        <motion.div
          key={i}
          variants={barVariants}
          style={{ height: `${h}%`, background: color }}
          className="w-full origin-bottom rounded-sm"
        />
      ))}
    </motion.div>
  );
}

/* History (teal, solid) draws in first; once it finishes, a lighter dashed
   forecast segment fades in and a dot pulses at the hand-off point — the
   dot keeps pulsing on a loop for as long as the card stays revealed. */
const HISTORY_DRAW_S = 0.6;
const FORECAST_FADE_S = 0.3;

function PredictiveChart() {
  const { ref, controls, onMouseEnter } = useReplayTrigger();

  const solidVariants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1, transition: { duration: HISTORY_DRAW_S, ease: EASE } },
  };
  const forecastVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: FORECAST_FADE_S, delay: HISTORY_DRAW_S, ease: EASE },
    },
  };
  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.25, delay: HISTORY_DRAW_S, ease: EASE },
    },
  };
  const pulseVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: [1, 2.6],
      opacity: [0.55, 0],
      transition: {
        duration: 1.6,
        delay: HISTORY_DRAW_S,
        repeat: Infinity,
        repeatDelay: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <svg
      ref={ref}
      onMouseEnter={onMouseEnter}
      viewBox="0 0 200 60"
      className="mt-4 w-full"
      initial="hidden"
      animate={controls}
    >
      <motion.path
        d="M4,48 L40,36 L76,40 L112,20"
        fill="none"
        stroke="#2dd4bf"
        strokeWidth="2"
        strokeLinecap="round"
        variants={solidVariants}
      />
      <motion.path
        d="M112,20 L148,26 L184,10"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="2"
        strokeDasharray="4 4"
        strokeLinecap="round"
        variants={forecastVariants}
      />
      {/* pulsing ring, behind the solid dot */}
      <motion.circle cx="112" cy="20" r="3" fill="#38bdf8" variants={pulseVariants} />
      <motion.circle cx="112" cy="20" r="2.2" fill="#38bdf8" variants={dotVariants} />
    </svg>
  );
}

/* A stack of report "documents", each with its own colored category tab.
   At rest they sit in a loose fan; on hover they spread further apart and
   the front sheet does a subtle page-flip, as if being riffled through.
   Owns its own hover trigger (rather than relying on the card's whileHover
   propagating down) so it fires reliably wherever the cursor enters it. */
const reportDocs = [
  { color: "#2dd4bf", rest: { x: -8, y: 5, rotate: -10 }, fan: { x: -32, y: 4, rotate: -20 }, z: 10 },
  {
    color: "#38bdf8",
    rest: { x: 0, y: 0, rotate: 0 },
    fan: { x: 0, y: -8, rotate: 0 },
    z: 30,
    flip: true,
  },
  { color: "#7dd3fc", rest: { x: 8, y: 5, rotate: 10 }, fan: { x: 32, y: 4, rotate: 20 }, z: 20 },
];

function ReportStack() {
  const controls = useAnimation();

  return (
    <div
      className="relative mt-4 flex h-20 items-center justify-center"
      style={{ perspective: 600 }}
      onMouseEnter={() => controls.start("hover")}
      onMouseLeave={() => controls.start("visible")}
    >
      {reportDocs.map((d, i) => (
        <motion.div
          key={i}
          initial="visible"
          animate={controls}
          variants={{
            visible: {
              x: d.rest.x,
              y: d.rest.y,
              rotate: d.rest.rotate,
              rotateY: 0,
              transition: { duration: 0.4, ease: EASE },
            },
            hover: {
              x: d.fan.x,
              y: d.fan.y,
              rotate: d.fan.rotate,
              rotateY: d.flip ? [0, -16, 0] : 0,
              transition: d.flip
                ? {
                    default: { duration: 0.4, delay: i * 0.05, ease: EASE },
                    rotateY: { duration: 0.7, ease: EASE, repeat: Infinity, repeatDelay: 0.5 },
                  }
                : { duration: 0.4, delay: i * 0.05, ease: EASE },
            },
          }}
          style={{ zIndex: d.z, transformStyle: "preserve-3d" }}
          className="absolute flex h-14 w-11 items-center justify-center rounded-md border border-slate-700 bg-slate-800 shadow-md"
        >
          <span
            className="absolute -top-1.5 left-2 h-2 w-4 rounded-t-sm"
            style={{ background: d.color }}
          />
          <FileText className="h-4 w-4 text-slate-500" strokeWidth={1.75} />
        </motion.div>
      ))}
    </div>
  );
}

const services = [
  {
    icon: Boxes,
    title: "Data Integration",
    copy: "Unify CRM, ERP, and spreadsheet data into one reliable source of truth.",
    render: () => <IntegrationHub />,
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    copy: "Forecast churn, demand, and revenue trends before they happen.",
    render: () => <PredictiveChart />,
  },
  {
    icon: BarChart3,
    title: "Real-Time Dashboards",
    copy: "Monitor KPIs live, without waiting for end-of-month reports.",
    render: () => (
      <div className="mt-4 flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <Stat target={87} suffix="%" label="Live KPI accuracy" />
          <Stat target={1240} label="Records synced / hr" />
          <Stat target={4.9} decimals={1} label="Avg. client rating" />
        </div>
        <div className="w-20">
          <BarChart values={[40, 65, 50, 85, 60]} color="#38bdf8" />
        </div>
      </div>
    ),
  },
  {
    icon: FileStack,
    title: "Custom Reporting",
    copy: "Reports built around how your business actually makes decisions.",
    render: () => <ReportStack />,
  },
];

/* "hover" is a named variant (not an inline whileHover object) so nested
   motion children — like the report-stack fan-out — can inherit the same
   hover state through the tree, per Framer's variant propagation. */
const cardVariants = {
  ...itemVariants,
  hover: {
    y: -6,
    boxShadow: "0 18px 40px -14px rgba(56,189,248,0.35)",
    borderColor: "rgba(56,189,248,0.4)",
    transition: { duration: 0.4, ease: EASE },
  },
};

function ServiceCard({ service }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
    >
      <div className="flex items-center gap-3">
        <service.icon className="h-5 w-5 text-sky-400" strokeWidth={1.75} />
        <h3 className="font-sans text-base font-semibold text-slate-100">
          {service.title}
        </h3>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{service.copy}</p>
      {service.render()}
    </motion.div>
  );
}

function CtaButton() {
  return (
    <motion.button
      initial={{ backgroundPosition: "0% 0%" }}
      whileHover={{ backgroundPosition: "100% 0%", scale: 1.03 }}
      transition={{ duration: 0.7, ease: EASE }}
      style={{
        backgroundImage: "linear-gradient(110deg, #38bdf8, #2dd4bf 45%, #38bdf8 90%)",
        backgroundSize: "200% 100%",
      }}
      className="rounded-full px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_10px_30px_-10px_rgba(56,189,248,0.5)]"
    >
      Get in touch
    </motion.button>
  );
}

export default function BusinessIntelligenceSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-6 py-24 font-sans">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-teal-500/20 blur-3xl" />
      {/* dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_35%,black,transparent)]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.22) 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="relative mx-auto max-w-5xl"
      >
        <motion.div variants={itemVariants} className="text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-teal-400">
            Data to decisions
          </span>
          <h2 className="mt-3 bg-gradient-to-r from-sky-300 via-slate-100 to-teal-300 bg-clip-text font-sans text-3xl font-bold text-transparent sm:text-4xl">
            Business Intelligence
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400 sm:text-base">
            Turn your CRM and ERP data into decisions you can act on.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <FlowDiagram />
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 py-10 text-center"
        >
          <p className="text-lg text-slate-200">
            See how BI can work for your business
          </p>
          <CtaButton />
        </motion.div>
      </motion.div>
    </section>
  );
}

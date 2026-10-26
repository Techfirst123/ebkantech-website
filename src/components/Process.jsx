import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * "How we work" — the engagement workflow in three tiers (Plan → Build →
 * Run), two stages each, with timing and the deliverable a client gets at
 * the end of every stage. Timings match the Saurya2x 6-week rollout; custom
 * projects are scoped in week 1.
 *   Layout: Bootstrap 5 grid (row / col-lg-4), scoped to .bs
 *   Motion: framer-motion, tiers rise in one after another
 * Styles: vibrant.css (.wf-).
 */

const TIERS = [
  {
    key: "plan",
    name: "Plan",
    when: "Week 1–2",
    color: "#0a6cff",
    goal: "Agree what success looks like before anything is built.",
    stages: [
      {
        n: "01",
        title: "Discover",
        text: "We map your workflows, data sources, roles and approval limits — and agree the number we are moving.",
        out: "Scope & success metrics",
      },
      {
        n: "02",
        title: "Design",
        text: "Data model, screens and integrations designed around your process, reviewed with your team before we build.",
        out: "Solution blueprint",
      },
    ],
  },
  {
    key: "build",
    name: "Build",
    when: "Week 2–4",
    color: "#6860e8",
    goal: "Working software every week — never a big reveal at the end.",
    stages: [
      {
        n: "03",
        title: "Migrate & prepare data",
        text: "Excel sheets and legacy systems moved in, cleaned and validated, so day-one numbers can be trusted.",
        out: "Validated, migrated data",
      },
      {
        n: "04",
        title: "Build & configure",
        text: "Modules, models and dashboards delivered in short sprints, with a working demo for you every week.",
        out: "Weekly working builds",
      },
    ],
  },
  {
    key: "run",
    name: "Run",
    when: "Week 5 onwards",
    color: "#0e9f97",
    goal: "Your team running it confidently — and it keeps getting better.",
    stages: [
      {
        n: "05",
        title: "Train & go live",
        text: "Hands-on training for each team on their own data, then go-live with our people on call.",
        out: "Live system, trained users",
      },
      {
        n: "06",
        title: "Support & improve",
        text: "We watch usage and accuracy, retrain models and grow the roadmap with you as the business scales.",
        out: "Support & roadmap",
      },
    ],
  },
];

const PROMISES = [
  ["Fixed scope per milestone", "You know what each stage delivers before it starts."],
  ["A demo every week", "Progress you can click through, not a status report."],
  ["Your data stays yours", "Clean handover and full export — no lock-in."],
  ["One accountable team", "The people who scope it are the people who build it."],
];

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] } }),
};

export default function Process() {
  return (
    <div className="wf bs">
      <ol className="wf-rail" aria-hidden="true">
        {TIERS.map((t) => (
          <li key={t.key} style={{ "--wf-c": t.color }}>
            <span className="wf-rail-dot" />
            <span className="wf-rail-lbl">
              <span className="wf-rail-name">{t.name}</span>
              <span className="wf-rail-when mono">{t.when}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="row g-3 g-lg-4">
        {TIERS.map((t, i) => (
          <div className="col-12 col-lg-4" key={t.key}>
            <motion.section
              className="wf-tier"
              style={{ "--wf-c": t.color }}
              variants={rise}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              custom={i}
              aria-labelledby={`wf-${t.key}`}
            >
              <header className="wf-tier-h">
                <span className="wf-tier-step mono">Stage {i + 1} of 3</span>
                <h3 id={`wf-${t.key}`}>{t.name}</h3>
                <span className="wf-tier-when mono">{t.when}</span>
                <p>{t.goal}</p>
              </header>
              <ol className="wf-stages">
                {t.stages.map((s) => (
                  <li key={s.n}>
                    <span className="wf-n mono">{s.n}</span>
                    <div>
                      <h4>{s.title}</h4>
                      <p>{s.text}</p>
                      <span className="wf-out">
                        <span className="wf-out-k mono">You get</span> {s.out}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </motion.section>
          </div>
        ))}
      </div>

      <div className="wf-promise">
        <div className="row g-0">
          {PROMISES.map(([t, d]) => (
            <div className="col-12 col-sm-6 col-lg-3" key={t}>
              <div className="wf-promise-item">
                <b>{t}</b>
                <span>{d}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="wf-foot">
        Rolling out <Link to="/products/saurya-2x">Saurya2x</Link>? This is the same plan —
        typically live in 6 weeks. Custom projects are scoped and priced at the end of week 1.
      </p>
    </div>
  );
}

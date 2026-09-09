import { useId, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PROJECTS } from "../data/projects";
import { DashboardShell } from "./dashboard/Dashboard";
import { trackEvent } from "../analytics";

/**
 * Homepage product accordion. Holds no product data and no dashboard
 * markup of its own — both come from src/data/projects.js and
 * components/dashboard/Dashboard.jsx, so this view and the per-product
 * pages can't drift apart.
 */

function DemoCard({ project, isOpen, onToggle }) {
  const panelId = useId();

  const handleToggle = () => {
    if (!isOpen) {
      trackEvent("select_content", {
        content_type: "product_demo_open",
        item_id: project.slug,
        item_name: project.name,
      });
    }
    onToggle(project.slug);
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
          <DashboardShell project={project} />

          <div className="demo-actions">
            <Link
              to={`/products/${project.slug}`}
              className="demo-cta"
              onClick={() =>
                trackEvent("select_content", {
                  content_type: "product_page_view",
                  item_id: project.slug,
                  item_name: project.name,
                })
              }
            >
              Explore {project.name}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <a href="#contact" className="demo-cta ghost">
              Enquire about this module
            </a>
          </div>
          <p className="demo-disclaimer mono">Sample data shown for demonstration only.</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProductDemos() {
  const [openId, setOpenId] = useState(PROJECTS[0].slug);
  const toggle = (id) => setOpenId((cur) => (cur === id ? null : id));

  return (
    <div className="demo-list">
      {PROJECTS.map((p) => (
        <DemoCard key={p.slug} project={p} isOpen={openId === p.slug} onToggle={toggle} />
      ))}
    </div>
  );
}

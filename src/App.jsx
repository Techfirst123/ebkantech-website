import { useEffect, useRef, useState } from "react";
import BusinessIntelligenceSection from "./components/BusinessIntelligenceSection";
import ScopeCards from "./components/ScopeCards";
import DeliveredCards from "./components/DeliveredCards";
import IndustryCards from "./components/IndustryCards";
import TrustedBy from "./components/TrustedBy";

const DEFAULT_NOTE =
  "We usually reply within one business day.";

// Reusable brand logo mark (Ebkan Tech logo image)
function LogoMark() {
  return (
    <img className="mark" src="/ebkan-tech-logo.png" alt="Ebkan Tech logo" />
  );
}

export default function App() {
  const [theme, setTheme] = useState(null); // null = follow system
  const [menuOpen, setMenuOpen] = useState(false);
  const [note, setNote] = useState({ text: DEFAULT_NOTE, color: undefined });
  const canvasRef = useRef(null);

  // Apply the chosen theme to <html data-theme="…"> (mirrors the old toggle)
  useEffect(() => {
    if (theme) document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const current =
      theme ??
      (window.matchMedia("(prefers-color-scheme:dark)").matches
        ? "dark"
        : "light");
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
      getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim() || fallback;

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

  // Contact form -> POST to /api/contact, which emails sales@ebkantech.com
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") || "").trim();
    const email = (data.get("email") || "").trim();
    const company = (data.get("company") || "").trim();
    const service = (data.get("service") || "").trim();
    const message = (data.get("message") || "").trim();

    if (!name || !email) {
      setNote({
        text: "Please add your name and email first.",
        color: "var(--accent)",
      });
      return;
    }

    setSending(true);
    setNote({ text: "Sending your enquiry…", color: "var(--muted)" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, service, message }),
      });
      if (!res.ok) throw new Error("Request failed");
      setNote({
        text: "Thanks — your enquiry has been sent. We usually reply within one business day.",
        color: "var(--teal)",
      });
      form.reset();
    } catch (err) {
      setNote({
        text: "Something went wrong sending that — please email sales@ebkantech.com directly.",
        color: "var(--accent)",
      });
    } finally {
      setSending(false);
    }
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
            <span className="brand-text">
              Ebkan Tech <small>/ data &amp; ERP</small>
            </span>
          </a>

          <div className="nav-right">
            {/* Theme - hamburger ke bahar */}
            <button
              className="theme-t"
              id="themeBtn"
              type="button"
              onClick={toggleTheme}
            >
              ◐ theme
            </button>

            {/* Desktop + mobile menu */}
            <nav className={`links ${menuOpen ? "menu-open" : ""}`}>
              <a href="#scope" onClick={() => setMenuOpen(false)}>
                Services
              </a>

              <a href="#process" onClick={() => setMenuOpen(false)}>
                How we work
              </a>

              <a href="#delivered" onClick={() => setMenuOpen(false)}>
                Delivered
              </a>

              <a href="#about" onClick={() => setMenuOpen(false)}>
                About
              </a>

              <a
                href="#contact"
                className="btn keep"
                onClick={() => setMenuOpen(false)}
              >
                Talk to us
              </a>
            </nav>

            {/* Hamburger */}
            <button
              className={`hamburger ${menuOpen ? "is-open" : ""}`}
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
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
              <span className="chip mono">
                Delivered: Solar EPC &amp; Construction ERP
              </span>
            </div>
            <h1>
              We turn your business data into{" "}
              <span className="amp">decisions</span>.
            </h1>
            <p className="lede">
              Ebkan Tech Pvt Ltd builds data science solutions and industry
              ERP/CRM systems — forecasting supply chains, cutting churn,
              streamlining warehouses and hospitals, and running purpose-built
              ERPs for solar EPC and construction.
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

        <TrustedBy />

        {/* SCOPE / SERVICES */}
        <section className="scope" id="scope">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <span className="eyebrow">Scope of business</span>
                <h2>
                  Data science, ERP, web, AI and marketing — organized by
                  category.
                </h2>
              </div>
              <p>
                Each category below groups the services we deliver — machine
                learning and analytics, ERP/CRM platforms, web &amp; app builds,
                applied AI, and growth marketing.
              </p>
            </div>
            <ScopeCards />
          </div>
        </section>

        <BusinessIntelligenceSection />

        {/* DELIVERED / PROOF */}
        <section className="delivered" id="delivered">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <span className="eyebrow">Delivered work</span>
                <h2>Six platforms, shipped and running.</h2>
              </div>
              <p>
                Purpose-built systems — not generic templates — spanning ERP,
                CRM, BI, AI, and e-commerce.
              </p>
            </div>
            <DeliveredCards />
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
              <p>
                Five stages, run in order. Each ends in something you can see,
                test, or ship.
              </p>
            </div>
            <div className="proc-grid">
              <div className="step">
                <div className="num">01 · Understand</div>
                <h4>Define the outcome</h4>
                <p>
                  We map your data sources, the decision to improve, and how
                  success will be measured.
                </p>
              </div>
              <div className="step">
                <div className="num">02 · Prepare</div>
                <h4>Clean &amp; model data</h4>
                <p>
                  Pipelines, warehousing, and feature engineering to make the
                  data trustworthy.
                </p>
              </div>
              <div className="step">
                <div className="num">03 · Build</div>
                <h4>Model &amp; develop</h4>
                <p>
                  ML models or ERP/CRM modules built in increments, reviewed
                  with you each sprint.
                </p>
              </div>
              <div className="step">
                <div className="num">04 · Deploy</div>
                <h4>Ship to production</h4>
                <p>
                  Dashboards, APIs, or full systems deployed with testing and
                  clean handover.
                </p>
              </div>
              <div className="step">
                <div className="num">05 · Support</div>
                <h4>Monitor &amp; improve</h4>
                <p>
                  We track accuracy and usage, retrain models, and evolve the
                  roadmap with you.
                </p>
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
              <p>
                Proven data science, BI, and platform tooling — chosen for
                accuracy, scale, and maintainability.
              </p>
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
          <div className="wrap">
            <div style={{ marginBottom: "48px" }}>
              <span className="eyebrow">Where we work</span>
              <h2 style={h2Compact}>Industries we serve</h2>
              <p
                style={{
                  color: "var(--muted)",
                  maxWidth: "52ch",
                  margin: "0 0 28px",
                }}
              >
                Domain context shortens every project. These are the sectors our
                data and ERP work lives in.
              </p>
              <IndustryCards />
            </div>
            <div>
              <span className="eyebrow">Engagement models</span>
              <h2 style={h2Compact}>Ways to work with us</h2>
              <div className="models">
                <div className="model">
                  <div className="mc">M-A</div>
                  <div>
                    <h4>Fixed-scope project</h4>
                    <p>
                      Defined deliverable — a model, dashboard, or ERP module —
                      with milestones and a fixed price.
                    </p>
                  </div>
                </div>
                <div className="model">
                  <div className="mc">M-B</div>
                  <div>
                    <h4>Data science retainer</h4>
                    <p>
                      An ongoing analytics partner that keeps models accurate
                      and reporting fresh.
                    </p>
                  </div>
                </div>
                <div className="model">
                  <div className="mc">M-C</div>
                  <div>
                    <h4>ERP / CRM implementation</h4>
                    <p>
                      End-to-end rollout — configuration, data migration,
                      training, and go-live support.
                    </p>
                  </div>
                </div>
                <div className="model">
                  <div className="mc">M-D</div>
                  <div>
                    <h4>Managed support &amp; AMC</h4>
                    <p>
                      We run and evolve your platform under a support agreement
                      so your team can focus elsewhere.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about">
          <div className="wrap">
            <div className="about-in">
              <div className="about-copy">
                <span className="eyebrow">About us</span>
                <h2>A data-driven team, close to your operations.</h2>
                <p>
                  Ebkan Tech Pvt Ltd is a data science and enterprise software
                  company. We help businesses in supply chain, healthcare,
                  e-commerce, energy and construction make better decisions with
                  their own data — and run the ERP and CRM systems those
                  decisions depend on.
                </p>
                <p>
                  We work close to the problem: understanding how a warehouse
                  actually moves stock, how a solar project gets costed, or why
                  customers churn — then building models and systems that fit
                  that reality, not a template.
                </p>
              </div>
              <div className="vals">
                <div className="val">
                  <div className="vt">01</div>
                  <h4>Domain-first</h4>
                  <p>
                    We learn your process before we model it. Context beats a
                    fancy algorithm.
                  </p>
                </div>
                <div className="val">
                  <div className="vt">02</div>
                  <h4>Measurable impact</h4>
                  <p>
                    Every engagement targets a number: cost, time, accuracy, or
                    retention.
                  </p>
                </div>
                <div className="val">
                  <div className="vt">03</div>
                  <h4>Own your systems</h4>
                  <p>
                    Clean handover, documentation, and training — no lock-in, no
                    black boxes.
                  </p>
                </div>
                <div className="val">
                  <div className="vt">04</div>
                  <h4>Long-term support</h4>
                  <p>
                    We stay on to retrain models and evolve platforms as your
                    business grows.
                  </p>
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
              <p>
                A few words from the teams we&apos;ve built data and ERP
                solutions for.
              </p>
            </div>
            <div className="q-grid">
              <div className="quote">
                <div className="qm">“</div>
                <p>
                  The demand forecasting models cut our stockouts noticeably and
                  gave planning a number they could trust every week.
                </p>
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
                <p>
                  Their Solar EPC ERP finally connected our procurement, finance
                  and site teams in one place. Project visibility is completely
                  different now.
                </p>
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
                <p>
                  The churn model flags at-risk customers early enough for us to
                  act. It&apos;s become part of how the sales team works.
                </p>
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
              <p>
                Tell us the decision you want to improve or the process you want
                to digitize. We&apos;ll reply with an approach and a rough
                timeline.
              </p>
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
                    <small>
                      Supply chain, hospitals, e-commerce, solar EPC,
                      construction.
                    </small>
                  </div>
                </div>
              </div>
              <form className="cform" onSubmit={handleSubmit} noValidate>
                <div className="row">
                  <div className="field">
                    <label htmlFor="cf-name">Your name</label>
                    <input
                      id="cf-name"
                      name="name"
                      type="text"
                      placeholder="Jane Doe"
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="cf-company">Company</label>
                    <input
                      id="cf-company"
                      name="company"
                      type="text"
                      placeholder="Acme Ltd"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="field">
                    <label htmlFor="cf-email">Work email</label>
                    <input
                      id="cf-email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="cf-service">Service of interest</label>
                    <select
                      id="cf-service"
                      name="service"
                      defaultValue="Data science &amp; forecasting"
                    >
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
                <button className="btn submit" type="submit" disabled={sending}>
                  {sending ? "Sending…" : "Send enquiry"}
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
                <span className="title">Ebkan Tech</span>
              </a>
              <p>
                Ebkan Tech Pvt Ltd — data science, ERP and CRM solutions for
                supply chain, healthcare, e-commerce, solar EPC and
                construction.
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

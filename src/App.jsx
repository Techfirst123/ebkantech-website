import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeroCode from "./components/HeroCode";
import CategoryCards from "./components/CategoryCards";
import Milestones from "./components/Milestones";
import ProductScroller from "./components/ProductScroller";
import FlipCards from "./components/FlipCards";
import { TECH } from "./components/TechStack";
import SauryaFeature from "./components/SauryaFeature";
import Process from "./components/Process";
import SiteFooter from "./components/SiteFooter";
import { Link } from "react-router-dom";
import { SITE } from "./data/site";
import { WHATSAPP } from "./data/contact";
import { TEAM } from "./data/team";


const DEFAULT_NOTE = "We usually reply within one business day.";

// Enquiry options. `id` matches ?interest=<id> links from product pages,
// so "Book a live demo" on /products/saurya-2x arrives with Saurya2x chosen.
const SERVICES = [
  { id: "saurya-2x", label: "Saurya2x — Solar EPC ERP demo" },
  { id: "vantage-rental-5x", label: "VantageRental5x — Property management ERP" },
  { id: "compliance-10x", label: "10x Compliance — CA / CPA firms" },
  { id: "warehouse-erp", label: "Warehouse Management ERP" },
  { id: "field-service-erp", label: "Field Service ERP" },
  { id: "construction-erp", label: "Construction / infrastructure ERP" },
  { id: "crm", label: "CRM solution" },
  { id: "data-science", label: "Data science, forecasting & BI" },
  { id: "web-app", label: "Website, web or mobile app" },
  { id: "other", label: "Not sure yet" },
];

// Brand logo mark (header)
function LogoMark() {
  return (
    <img className="mark" src="/ebkan-tech-logo.png" alt="Ebkan Tech logo" />
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [note, setNote] = useState({ text: DEFAULT_NOTE, color: undefined });
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Arriving from another page: /#contact, /#scope, /#products scroll there.
  // Old /#demo-<id> links (the module previews used to live on this page)
  // now go to that product's own page.
  const { hash, search } = useLocation();
  const [service, setService] = useState(SERVICES[0].label);
  useEffect(() => {
    const id = new URLSearchParams(search).get("interest");
    const match = SERVICES.find((x) => x.id === id);
    if (match) setService(match.label);
  }, [search]);
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    if (id.startsWith("demo-")) {
      navigate(`/products/${id.slice("demo-".length)}`, { replace: true });
      return;
    }
    document.getElementById(id)?.scrollIntoView();
  }, [hash, navigate]);

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

  // Contact form -> /api/contact (Vercel function, emails the sales inbox).
  // If the API is unavailable, fall back to opening the visitor's email app.
  const [sending, setSending] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const fields = {
      name: (data.get("name") || "").trim(),
      email: (data.get("email") || "").trim(),
      company: (data.get("company") || "").trim(),
      phone: (data.get("phone") || "").trim(),
      service: (data.get("service") || "").trim(),
      message: (data.get("message") || "").trim(),
    };

    if (!fields.name || !fields.email) {
      setNote({ text: "Please add your name and work email first.", color: "var(--accent)" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      setNote({ text: "That email address doesn't look right — please check it.", color: "var(--accent)" });
      return;
    }

    setSending(true);
    setNote({ text: "Sending…", color: undefined });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setService(SERVICES[0].label);
      setNote({
        text: `Thanks ${fields.name.split(" ")[0]} — your enquiry is in. We'll reply within one business day.`,
        color: "var(--teal)",
      });
    } catch {
      const subject = `Enquiry: ${fields.service} — ${fields.name}${fields.company ? ` (${fields.company})` : ""}`;
      const body = `Name: ${fields.name}\nCompany: ${fields.company}\nEmail: ${fields.email}\nPhone: ${fields.phone}\nInterest: ${fields.service}\n\n${fields.message}\n`;
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setNote({
        text: `We couldn't send it from here, so your email app should open with the message ready. You can also write to ${SITE.email}.`,
        color: "var(--accent)",
      });
    } finally {
      setSending(false);
    }
  };

  const tel = SITE.phone ? `tel:${SITE.phone.replace(/[^\d+]/g, "")}` : "";
  const wa = WHATSAPP.number
    ? `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(WHATSAPP.message)}`
    : "";

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
              Ebkan Tech <small>/ industry ERP</small>
            </span>
          </a>

          <div className="nav-right">
            {/* Desktop + mobile menu */}
            <nav className={`links ${menuOpen ? "menu-open" : ""}`}>
              <Link to="/products/saurya-2x" onClick={() => setMenuOpen(false)}>
                Saurya2x
              </Link>

              <a href="#products" onClick={() => setMenuOpen(false)}>
                Products
              </a>

              <a href="#scope" onClick={() => setMenuOpen(false)}>
                Services
              </a>

              <a href="#about" onClick={() => setMenuOpen(false)}>
                About
              </a>

              <a
                href="#contact"
                className="btn keep"
                onClick={() => setMenuOpen(false)}
              >
                Book a demo
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
            {/* the whole hero sits in one IDE window: static README + live code */}
            <HeroCode>
              <Link to="/products/saurya-2x" className="chip mono chip-live">
                <span className="chip-dot" aria-hidden="true" />
                NEW · <b>Saurya2x</b> — the ERP for solar EPC is live →
              </Link>
              <h1>
                We turn your business data into{" "}
                <span className="amp">decisions</span>.
              </h1>
              <p className="lede">
                Ebkan Tech builds ERP products for the industries we know from
                the inside — led by <b>Saurya2x</b> for solar EPC — with the data
                science, forecasting and BI that make every number in them
                something you can act on.
              </p>
              <div className="hero-cta">
                <Link to="/products/saurya-2x" className="btn">
                  Explore Saurya2x
                </Link>
                <a href="#contact" className="btn ghost">
                  Book a demo →
                </a>
              </div>
            </HeroCode>
            {/* milestones: Bootstrap 5 grid + GSAP */}
            <Milestones />
          </div>
        </section>

        {/* FLAGSHIP PRODUCT */}
        <SauryaFeature />

        {/* SCOPE / SERVICES */}
        <section className="scope scope-compact" id="scope">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <span className="eyebrow">Scope of business</span>
                <h2>
                  What we <span className="hl">do</span>.
                </h2>
              </div>
              <p>
                Data science, ERP, CRM, web &amp; app, AI and marketing — pick a
                category to see its services and demos.
              </p>
            </div>
          </div>
          <CategoryCards />
        </section>

        {/* PINNED PRODUCT SHOWCASE */}
        <section className="psc-section" id="products">
          <div className="wrap">
            <ProductScroller />
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="wf-section">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <span className="eyebrow">How we work</span>
                <h2>
                  A clear path from first call to <span className="hl">go-live</span>.
                </h2>
              </div>
              <p>
                Three stages, six steps. Every step has a timeline and ends with
                something you can see, test or use — so you always know where
                your project stands.
              </p>
            </div>
            <Process />
          </div>
        </section>

        {/* INDUSTRIES + ENGAGEMENT MODELS */}
        <section id="industries">
          <div className="wrap two">
            <div>
              <span className="eyebrow">Where we work</span>
              <h2 style={h2Compact}>Industries we serve</h2>
              <p
                style={{
                  color: "var(--muted)",
                  maxWidth: "44ch",
                  margin: "0 0 22px",
                }}
              >
                Domain context shortens every project. These are the sectors
                our products and data work are built for.
              </p>
              <div className="ind-list">
                <span>Solar &amp; Renewable Energy</span>
                <span>Construction &amp; Infrastructure</span>
                <span>Real Estate &amp; Property Management</span>
                <span>Accounting &amp; Compliance Firms</span>
                <span>Warehousing &amp; Logistics</span>
              </div>
            </div>
            <div>
              <span className="eyebrow">Engagement models</span>
              <h2 style={h2Compact}>Ways to work with us</h2>
              <FlipCards />
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about">
          <div className="wrap">
            <div className="about-in">
              <div className="about-copy">
                <span className="eyebrow">About us</span>
                <h2>A young company, built by an <span className="hl">experienced</span> team.</h2>
                <p>
                  Ebkan Tech Pvt Ltd is a product and data company. Our team
                  brings years of hands-on experience in enterprise software,
                  ERP delivery and data science — and we started Ebkan Tech to
                  build the industry ERPs we wished our clients had.
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
            {TEAM.length > 0 && (
              <div className="team">
                <h3 className="team-h">The people behind Ebkan Tech</h3>
                <div className="team-grid">
                  {TEAM.map((m) => (
                    <div className="team-card" key={m.name}>
                      {m.photo ? (
                        <img src={m.photo} alt={m.name} width="96" height="96" loading="lazy" />
                      ) : (
                        <span className="team-ini" aria-hidden="true">
                          {m.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                        </span>
                      )}
                      <b>{m.name}</b>
                      <span className="team-role">{m.role}</span>
                      {m.bio && <p>{m.bio}</p>}
                      {m.linkedin && (
                        <a href={m.linkedin} target="_blank" rel="noopener noreferrer">
                          LinkedIn
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* TECHNOLOGY — one compact strip */}
        <section className="tech-strip" id="stack" aria-label="Technology we build with">
          <div className="wrap">
            <span className="eyebrow">Built with</span>
            <ul className="tech-strip-list">
              {TECH.filter((g) => g.items)
                .flatMap((g) => g.items)
                .map((t) => (
                  <li key={t}>{t}</li>
                ))}
            </ul>
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
                  Book a demo, or tell us what you need.
                </h2>
              </div>
              <p>
                For a Saurya2x demo, send one project&apos;s BOQ and vendor list
                and we&apos;ll show you your own dashboard. For anything else, tell
                us the process you want to digitize — we&apos;ll reply with an
                approach and a rough timeline.
              </p>
            </div>
            <div className="contact-in">
              <div className="cinfo">
                <div className="ci">
                  <div className="cik">Email</div>
                  <div className="civ">
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                    <small>We usually reply within one business day.</small>
                  </div>
                </div>
                {tel && (
                  <div className="ci">
                    <div className="cik">Phone</div>
                    <div className="civ">
                      <a href={tel}>{SITE.phone}</a>
                      <small>Call or WhatsApp to book a demo.</small>
                    </div>
                  </div>
                )}
                {wa && (
                  <div className="ci">
                    <div className="cik">WhatsApp</div>
                    <div className="civ">
                      <a href={wa} target="_blank" rel="noopener noreferrer">
                        Chat with us on WhatsApp
                      </a>
                      <small>Quickest way to reach the team.</small>
                    </div>
                  </div>
                )}
                {SITE.bookingUrl && (
                  <div className="ci">
                    <div className="cik">Book</div>
                    <div className="civ">
                      <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer">
                        Pick a 30-minute slot
                      </a>
                      <small>Live demo on your own project data.</small>
                    </div>
                  </div>
                )}
                <div className="ci">
                  <div className="cik">Company</div>
                  <div className="civ">
                    {SITE.name}
                    <small>Industry ERP products · data science · BI</small>
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
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="cf-company">Company</label>
                    <input
                      id="cf-company"
                      name="company"
                      type="text"
                      placeholder="Company name"
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
                    <label htmlFor="cf-phone">Phone / WhatsApp</label>
                    <input
                      id="cf-phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="cf-service">I&apos;m interested in</label>
                  <select
                    id="cf-service"
                    name="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                  >
                    {SERVICES.map((x) => (
                      <option key={x.id}>{x.label}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="cf-msg">What do you want to achieve?</label>
                  <textarea
                    id="cf-msg"
                    name="message"
                    placeholder="E.g. We run 12 rooftop and 3 ground-mount projects a year, currently on Excel and WhatsApp."
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

      <SiteFooter cta={false} />
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import { gsap, reducedMotion, whenBooted } from "../motion";

/**
 * Hero IDE — the whole hero lives inside one editor window:
 *   ┌ title bar ─────────────────────────────────────────────┐
 *   │ explorer │ README.md (static hero copy) │ code (live)  │
 *   └ status bar ────────────────────────────────────────────┘
 *
 * - The README pane is the real hero content (h1, lede, buttons), passed in
 *   as `children` from App.jsx. It never changes.
 * - The code pane types a file → pauses → flips in 3D → next file (loops).
 *   Each file carries a business `title` and `sub`, shown above the code, so
 *   every flip introduces another part of Ebkan Tech.
 * - To add a business: add an entry to SNIPPETS (plain Python as a string —
 *   it is syntax-coloured automatically). Keep lines under ~46 characters.
 *
 * Accessibility: screen readers get the current file once (visually hidden
 * <pre>); the animated copy is aria-hidden. Reduced motion: the first file
 * is shown complete — no typing or flipping.
 * Styles: hero-code.css (.ide).
 */

const SNIPPETS = [
  {
    file: "saurya2x.py",
    title: "Saurya2x",
    tag: "Solar EPC ERP",
    sub: "Compliance-gated execution, from tender to handover.",
    accent: "#8b85ff",
    code: `from ebkan.erp import Saurya2x

project = Saurya2x.project(
    "Kadapa 2.4 MW", type="ground-mount",
)
project.boq.generate(per="MW")

site = project.site("SR-114")
site.require_nocs("DISCOM", "CEIG", "Fire")
print(site.status)  # locked until NOCs clear

project.margin(unit="₹/Wp")`,
  },
  {
    file: "slip_risk.py",
    title: "Risk prediction",
    tag: "AI in Saurya2x",
    sub: "See which projects will slip — weeks before they do.",
    accent: "#f5a623",
    code: `from ebkan.erp import Saurya2x

erp = Saurya2x(site="Kadapa 2.4 MW")
risk = erp.slip_risk()

if risk.score > 80:
    erp.alert(
        "Add a second crew",
        to="projects-head",
    )`,
  },
  {
    file: "forecast.py",
    title: "Data science",
    tag: "Forecasting & ML",
    sub: "Models trained on your own history, not a template.",
    accent: "#2dd4bf",
    code: `from ebkan.ml import DemandModel

# learn from your own sales history
model = DemandModel(horizon="90d")
model.fit(sales_history)

plan = model.predict(
    warehouse="Pune East",
    reorder=True,
)
print(plan.summary())`,
  },
  {
    file: "vantage.py",
    title: "VantageRental5x",
    tag: "Property management ERP",
    sub: "Leases, cheques, Ejari and owner statements — for Dubai agencies.",
    accent: "#14b8a6",
    code: `from ebkan.erp import VantageRental5x

erp = VantageRental5x(agency="Dubai Marina")

for lease in erp.renewals(days=90):
    lease.send_offer(lang="EN/AR")

erp.cheques.bounced().notify("accounts")
print(erp.occupancy())  # 93.4%`,
  },
  {
    file: "compliance.py",
    title: "10x Compliance",
    tag: "For CA & CPA firms",
    sub: "Every statutory deadline, every entity, every country.",
    accent: "#60a5fa",
    code: `from ebkan.apps import Compliance10x

firm = Compliance10x(
    countries=["IN", "AE", "SG", "US"],
)
due = firm.deadlines(within="7d")

for filing in due.overdue():
    filing.assign(reviewer="partner")`,
  },
  {
    file: "dashboard.py",
    title: "Business intelligence",
    tag: "Live dashboards",
    sub: "Your whole operation on one screen at 9 a.m.",
    accent: "#a78bfa",
    code: `from ebkan.bi import Dashboard

board = Dashboard("Portfolio · 9 a.m.")
board.add_kpi("Capacity in execution", "MW")
board.add_kpi("Margin variance", "%")

board.refresh(every="15m")
board.share(to="management")`,
  },
];

/* ---------- tiny Python highlighter: string → [[type, text], …] per line ---------- */
const KW = new Set(["from", "import", "if", "for", "in", "print", "True", "False", "None", "return", "def", "else"]);
const TOKEN = /(#.*$)|("[^"]*"|'[^']*')|(\d+(?:\.\d+)?%?)|([A-Za-z_][\w.]*)|(\s+)|([^\w\s"'#]+)/g;

function tokenize(line) {
  const out = [];
  let m;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(line))) {
    const [t, cm, str, num, word, sp] = m;
    if (cm) out.push(["cm", t]);
    else if (str) out.push(["str", t]);
    else if (num) out.push(["num", t]);
    else if (word) {
      const rest = line.slice(TOKEN.lastIndex);
      if (KW.has(word)) out.push(["kw", word]);
      else if (/^\s*=(?!=)/.test(rest)) out.push(["param", word]);
      else if (/^\(/.test(rest)) {
        // obj.method( → colour the object plain, the call as a function
        const dot = word.lastIndexOf(".");
        if (dot > 0) out.push(["name", word.slice(0, dot + 1)], ["fn", word.slice(dot + 1)]);
        else out.push(["fn", word]);
      } else out.push(["name", word]);
    } else if (sp) out.push(["sp", t]);
    else out.push(["punc", t]);
  }
  return out;
}

const FILES = SNIPPETS.map((s) => ({ ...s, lines: s.code.split("\n").map(tokenize) }));
const CHAR_MS = 24; // typing speed
const HOLD_MS = 3400; // pause on a finished file before flipping to the next
const ROWS = Math.max(...FILES.map((s) => s.lines.length)); // fixed height

const lineText = (line) => line.map(([, t]) => t).join("");
const totalChars = (lines) => lines.reduce((n, l) => n + lineText(l).length + 1, 0);

function FileIcon({ md }) {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
      {md ? (
        <path fill="#60a5fa" d="M2 3h12v10H2zM4 10V6l2 2 2-2v4M10 6v4l2-2" stroke="#0d1117" strokeWidth="1" />
      ) : (
        <path fill="#f5c542" d="M8 1C5 1 5 2.3 5 3v1.5h3V5H3.5C2 5 1 6.2 1 8s1 3 2.5 3H5V9.5C5 8.7 5.7 8 6.5 8h3C10.3 8 11 7.3 11 6.5V3c0-.7-.6-2-3-2zm-1.5 1a.6.6 0 1 1 0 1.2.6.6 0 0 1 0-1.2z" />
      )}
    </svg>
  );
}

export default function HeroCode({ children }) {
  const [snip, setSnip] = useState(0);
  const [typed, setTyped] = useState(() => totalChars(FILES[0].lines)); // complete until booted
  const [done, setDone] = useState(true);
  const paneRef = useRef(null);

  /* typing + flipping loop */
  useEffect(() => {
    if (reducedMotion()) return;
    let cancelled = false;
    let timer;
    const sleep = (ms) =>
      new Promise((r) => {
        timer = setTimeout(r, ms);
      });
    const tween = (vars) => new Promise((r) => gsap.to(paneRef.current, { ...vars, onComplete: r }));

    const run = async () => {
      await whenBooted();
      let i = 0;
      while (!cancelled) {
        const total = totalChars(FILES[i].lines);
        setSnip(i);
        setDone(false);
        for (let n = 0; n <= total && !cancelled; n++) {
          setTyped(n);
          await sleep(CHAR_MS);
        }
        if (cancelled) return;
        setDone(true);
        await sleep(HOLD_MS);
        if (cancelled) return;
        // 3D flip: turn away, swap file, turn back
        await tween({ rotationY: 90, duration: 0.32, ease: "power2.in" });
        if (cancelled) return;
        i = (i + 1) % FILES.length;
        setSnip(i);
        setTyped(0);
        gsap.set(paneRef.current, { rotationY: -90 });
        await tween({ rotationY: 0, duration: 0.42, ease: "power3.out" });
      }
    };
    run();
    return () => {
      cancelled = true;
      clearTimeout(timer);
      gsap.killTweensOf(paneRef.current);
    };
  }, []);

  const current = FILES[snip];
  const lines = current.lines;

  // reveal `typed` characters; the caret sits where typing is
  let left = typed;
  let caretPlaced = false;
  let before = 0;
  const rows = Array.from({ length: ROWS }, (_, li) => {
    const line = lines[li];
    if (!line) {
      return (
        <div className="hc-line" key={li}>
          <span className="hc-ln">{li + 1}</span>
          <span className="hc-code" />
        </div>
      );
    }
    const parts = [];
    for (const [type, text] of line) {
      if (left <= 0) break;
      const shown = text.slice(0, left);
      left -= shown.length;
      parts.push(
        <span key={parts.length} className={`hc-${type}`}>
          {shown}
        </span>,
      );
    }
    const len = lineText(line).length;
    const remaining = typed - before;
    const isLast = li === lines.length - 1;
    const isCaretLine = !caretPlaced && remaining >= 0 && (remaining <= len || isLast);
    if (isCaretLine) caretPlaced = true;
    before += len + 1;
    left -= 1; // the newline keystroke
    return (
      <div className="hc-line" key={li}>
        <span className="hc-ln">{li + 1}</span>
        <span className="hc-code">
          {parts}
          {isCaretLine && <span className={"hc-caret" + (done ? " is-idle" : "")} />}
        </span>
      </div>
    );
  });

  return (
    <div className="ide">
      {/* title bar */}
      <div className="ide-bar">
        <span className="hc-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="ide-title mono">ebkan-tech — workspace</span>
        <span className="ide-bar-end mono" aria-hidden="true">
          main
        </span>
      </div>

      <div className="ide-body">
        {/* explorer */}
        <aside className="ide-explorer mono" aria-hidden="true">
          <div className="ide-ex-h">Explorer</div>
          <div className="ide-ex-folder">▾ ebkan-tech</div>
          <div className="ide-ex-file is-pinned">
            <FileIcon md /> README.md
          </div>
          {FILES.map((f, i) => (
            <div key={f.file} className={"ide-ex-file" + (i === snip ? " is-on" : "")}>
              <FileIcon /> {f.file}
            </div>
          ))}
        </aside>

        {/* README — static hero copy */}
        <div className="ide-pane ide-readme">
          <div className="ide-tabs mono" aria-hidden="true">
            <span className="ide-tab is-on">
              <FileIcon md /> README.md
            </span>
            <span className="ide-tab-note">Preview</span>
          </div>
          <div className="ide-readme-body">{children}</div>
        </div>

        {/* live code */}
        <div className="ide-pane ide-code-wrap">
          <div className="ide-code" ref={paneRef} style={{ "--ide-accent": current.accent }}>
            <div className="ide-tabs mono">
              <span className="ide-tab is-on">
                <FileIcon /> {current.file}
              </span>
              <span className="hc-lang mono">Python</span>
            </div>

            <div className="ide-biz" aria-live="polite">
              <span className="ide-biz-tag mono">
                <span className="ide-biz-dot" aria-hidden="true" />
                {current.tag}
              </span>
              <b className="ide-biz-title">{current.title}</b>
              <span className="ide-biz-sub">{current.sub}</span>
            </div>

            <pre className="hc-sr">{lines.map(lineText).join("\n")}</pre>
            <div className="hc-body mono" aria-hidden="true">
              {rows}
            </div>
          </div>
        </div>
      </div>

      {/* status bar */}
      <div className="hc-status ide-status mono">
        <span className="hc-ok">
          <span className="hc-ok-dot" aria-hidden="true" />
          No issues · {current.file}
        </span>
        <span className="hc-files" aria-hidden="true">
          {FILES.map((s, i) => (
            <i key={s.file} className={i === snip ? "is-on" : ""} />
          ))}
        </span>
        <span className="hc-branch">Python · UTF-8</span>
      </div>
    </div>
  );
}

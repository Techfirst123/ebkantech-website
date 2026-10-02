import { useEffect, useRef, useState } from "react";
import { gsap, reducedMotion, whenBooted } from "../motion";

/**
 * Hero code card — a live editor window that cycles through Python files:
 *   type a snippet → pause → 3D flip → next file → type … (loops)
 * The card also tilts toward the mouse and floats gently while idle.
 *
 * Each line is a list of [tokenType, text] pairs so syntax colours stay
 * right at every point of the typing. Token types: kw (keyword), name,
 * fn (call), param, str, num, punc, cm (comment), sp (spaces).
 * To change the code, edit SNIPPETS.
 *
 * Accessibility: screen readers get the current file once (visually hidden
 * <pre>); the animated copy is aria-hidden. Reduced motion: the first file
 * is shown complete — no typing, flipping, tilting or floating.
 * Styles: hero-code.css (.hc).
 */

const SNIPPETS = [
  {
    file: "ebkan.py",
    lines: [
      [["kw", "from"], ["sp", " "], ["name", "ebkan"], ["sp", " "], ["kw", "import"], ["sp", " "], ["name", "Platform"]],
      [],
      [["name", "ebkan"], ["punc", " = "], ["fn", "Platform"], ["punc", "("]],
      [["sp", "    "], ["param", "name"], ["punc", "="], ["str", '"Ebkan Tech"'], ["punc", ","]],
      [["sp", "    "], ["param", "focus"], ["punc", "=["]],
      [["sp", "        "], ["str", '"Data Science"'], ["punc", ", "], ["str", '"ERP"'], ["punc", ", "], ["str", '"CRM"'], ["punc", ","]],
      [["sp", "    "], ["punc", "],"]],
      [["sp", "    "], ["param", "erp_delivered"], ["punc", "="], ["num", "15"], ["punc", ","]],
      [["sp", "    "], ["param", "industries"], ["punc", "="], ["str", '"20+"'], ["punc", ","]],
      [["sp", "    "], ["param", "status"], ["punc", "="], ["str", '"available"'], ["punc", ","]],
      [["punc", ")"]],
      [["name", "ebkan"], ["punc", "."], ["fn", "forecast"], ["punc", "("], ["param", "horizon"], ["punc", "="], ["str", '"90d"'], ["punc", ")"]],
    ],
  },
  {
    file: "forecast.py",
    lines: [
      [["kw", "from"], ["sp", " "], ["name", "ebkan.ml"], ["sp", " "], ["kw", "import"], ["sp", " "], ["name", "DemandModel"]],
      [],
      [["cm", "# learn from your own sales history"]],
      [["name", "model"], ["punc", " = "], ["fn", "DemandModel"], ["punc", "("], ["param", "horizon"], ["punc", "="], ["str", '"90d"'], ["punc", ")"]],
      [["name", "model"], ["punc", "."], ["fn", "fit"], ["punc", "("], ["name", "sales_history"], ["punc", ")"]],
      [],
      [["name", "plan"], ["punc", " = "], ["name", "model"], ["punc", "."], ["fn", "predict"], ["punc", "("]],
      [["sp", "    "], ["param", "warehouse"], ["punc", "="], ["str", '"Pune East"'], ["punc", ","]],
      [["sp", "    "], ["param", "reorder"], ["punc", "="], ["kw", "True"], ["punc", ","]],
      [["punc", ")"]],
      [["fn", "print"], ["punc", "("], ["name", "plan"], ["punc", "."], ["fn", "summary"], ["punc", "())"]],
    ],
  },
  {
    // sample project from the SolarERP10x product demo
    file: "solar_risk.py",
    lines: [
      [["kw", "from"], ["sp", " "], ["name", "ebkan.erp"], ["sp", " "], ["kw", "import"], ["sp", " "], ["name", "SolarERP10x"]],
      [],
      [["name", "erp"], ["punc", " = "], ["fn", "SolarERP10x"], ["punc", "("], ["param", "site"], ["punc", "="], ["str", '"Kadapa 2.4 MW"'], ["punc", ")"]],
      [["name", "risk"], ["punc", " = "], ["name", "erp"], ["punc", "."], ["fn", "slip_risk"], ["punc", "()"]],
      [],
      [["kw", "if"], ["sp", " "], ["name", "risk"], ["punc", "."], ["name", "score"], ["punc", " > "], ["num", "80"], ["punc", ":"]],
      [["sp", "    "], ["name", "erp"], ["punc", "."], ["fn", "alert"], ["punc", "("]],
      [["sp", "        "], ["str", '"Add a second crew"'], ["punc", ","]],
      [["sp", "        "], ["param", "to"], ["punc", "="], ["str", '"projects-head"'], ["punc", ","]],
      [["sp", "    "], ["punc", ")"]],
    ],
  },
];

const CHAR_MS = 30; // typing speed
const HOLD_MS = 3800; // pause on a finished file before flipping to the next
const ROWS = Math.max(...SNIPPETS.map((s) => s.lines.length)); // fixed height

const lineText = (line) => line.map(([, t]) => t).join("");
const totalChars = (lines) => lines.reduce((n, l) => n + lineText(l).length + 1, 0);

export default function HeroCode() {
  const [snip, setSnip] = useState(0);
  const [typed, setTyped] = useState(() => totalChars(SNIPPETS[0].lines)); // complete until booted
  const [done, setDone] = useState(true);
  const tiltRef = useRef(null);
  const cardRef = useRef(null);

  /* typing + flipping loop */
  useEffect(() => {
    if (reducedMotion()) return;
    let cancelled = false;
    let timer;
    const sleep = (ms) =>
      new Promise((r) => {
        timer = setTimeout(r, ms);
      });

    const flip = (deg) =>
      new Promise((r) => gsap.to(cardRef.current, { rotationY: deg, duration: 0.35, ease: "power2.in", onComplete: r }));

    const run = async () => {
      await whenBooted();
      let i = 0;
      while (!cancelled) {
        const total = totalChars(SNIPPETS[i].lines);
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
        await flip(90);
        if (cancelled) return;
        i = (i + 1) % SNIPPETS.length;
        setSnip(i);
        setTyped(0);
        gsap.set(cardRef.current, { rotationY: -90 });
        await new Promise((r) =>
          gsap.to(cardRef.current, { rotationY: 0, duration: 0.45, ease: "power3.out", onComplete: r }),
        );
      }
    };
    run();
    return () => {
      cancelled = true;
      clearTimeout(timer);
      gsap.killTweensOf(cardRef.current);
    };
  }, []);

  /* idle float + tilt toward the mouse (pointer devices only) */
  useEffect(() => {
    if (reducedMotion()) return;
    const el = tiltRef.current;
    const float = gsap.to(el, {
      y: -8,
      rotationZ: 0.6,
      duration: 3.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    if (!window.matchMedia("(hover: hover)").matches) return () => float.kill();

    const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
    const hero = el.closest("section") || window;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      ry(dx * 16); // max ±8°
      rx(-dy * 12); // max ±6°
    };
    const onLeave = () => {
      rx(0);
      ry(0);
    };
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      float.kill();
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const current = SNIPPETS[snip];
  const lines = current.lines;

  // reveal `typed` characters; the caret sits where typing is
  let left = typed;
  let caretPlaced = false;
  let before = 0;
  const rows = Array.from({ length: ROWS }, (_, li) => {
    const line = lines[li];
    if (!line) {
      // padding rows keep every file the same height
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
    <div className="hc-stage">
      <div className="hc-tilt" ref={tiltRef}>
        <figure className="hc" ref={cardRef} aria-label={`Python code sample, ${current.file}`}>
          <div className="hc-bar">
            <span className="hc-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="hc-file mono">{current.file}</span>
            <span className="hc-lang mono">Python</span>
          </div>

          <pre className="hc-sr">{lines.map(lineText).join("\n")}</pre>
          <div className="hc-body mono" aria-hidden="true">
            {rows}
          </div>

          <div className="hc-status mono">
            <span className="hc-ok">
              <span className="hc-ok-dot" aria-hidden="true" />
              No issues · {lines.length} lines
            </span>
            <span className="hc-files" aria-hidden="true">
              {SNIPPETS.map((s, i) => (
                <i key={s.file} className={i === snip ? "is-on" : ""} />
              ))}
            </span>
            <span className="hc-branch">main</span>
          </div>
        </figure>
      </div>
    </div>
  );
}

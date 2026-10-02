import { useEffect, useRef, useState } from "react";
import { markBooted, reducedMotion } from "../motion";

/**
 * Terminal-style loading screen, shown on every fresh page load (not on
 * in-app navigation): boot lines tick off one by one while a progress bar
 * runs to 100%, then "Welcome to Ebkan Tech" — and it fades into the page.
 *
 * - ~3 s total. Click anywhere / press Esc / "Skip" to jump straight in.
 * - Reduced motion: shows the finished state briefly, no animation.
 * - Calls markBooted() when done, so hero animations start on cue.
 * Styles: boot.css (.boot).
 */

const LINES = [
  "Initializing Ebkan platform...",
  "Loading data models...",
  "Fetching ERP products...",
  "Syncing CRM pipelines...",
  "Connecting dashboards...",
  "All systems ready...",
];
const STEP_MS = 330; // per boot line
const WELCOME_HOLD_MS = 650; // after "Welcome", before fading out
const FADE_MS = 450;

export default function BootScreen() {
  const reduce = reducedMotion();
  // starts at 0 on the server and in the browser so hydration matches
  const [done, setDone] = useState(0); // lines completed
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const timers = useRef([]);

  const finish = () => {
    if (leaving) return;
    timers.current.forEach(clearTimeout);
    setDone(LINES.length);
    setLeaving(true);
    timers.current = [
      setTimeout(() => {
        // give the page its scrollbar back first, so markBooted()'s
        // ScrollTrigger.refresh() measures the real layout
        document.documentElement.style.overflow = "";
        setGone(true);
        markBooted();
      }, FADE_MS),
    ];
  };

  useEffect(() => {
    // no page scrolling while the loader is up
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    if (reduce) {
      setDone(LINES.length);
      timers.current.push(setTimeout(finish, 700));
    } else {
      LINES.forEach((_, i) => {
        timers.current.push(setTimeout(() => setDone(i + 1), 250 + STEP_MS * (i + 1)));
      });
      timers.current.push(setTimeout(finish, 250 + STEP_MS * LINES.length + WELCOME_HOLD_MS));
    }

    const onKey = (e) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      timers.current.forEach(clearTimeout);
      window.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
    };
    // run once per page load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (gone) document.documentElement.style.overflow = "";
  }, [gone]);

  if (gone) return null;

  const percent = Math.round((done / LINES.length) * 100);
  const ready = done === LINES.length;

  return (
    <div
      className={"boot" + (leaving ? " is-leaving" : "")}
      role="status"
      aria-live="polite"
      aria-label={ready ? "Ebkan Tech is ready" : `Loading Ebkan Tech, ${percent}%`}
      onClick={finish}
    >
      <div className="boot-win" onClick={(e) => e.stopPropagation()}>
        <div className="boot-bar">
          <span className="boot-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="boot-title">ebkantech.com — bash</span>
          <span className="boot-ver">v3.0.0</span>
        </div>

        <div className="boot-body">
          <p className="boot-tag">
            <span aria-hidden="true">[</span> Ebkan Tech OS — Data · ERP · CRM <span aria-hidden="true">]</span>
          </p>

          <ul className="boot-lines">
            {LINES.map((line, i) => (
              <li key={line} className={i < done ? "is-done" : i === done ? "is-running" : ""}>
                <span className="boot-prompt" aria-hidden="true">
                  &gt;
                </span>
                {line}
                {i < done && (
                  <span className="boot-check" aria-hidden="true">
                    ✓
                  </span>
                )}
              </li>
            ))}
          </ul>

          <div className="boot-progress" aria-hidden="true">
            <span className="boot-track">
              <span className="boot-fill" style={{ width: `${percent}%` }} />
            </span>
            <span className="boot-pct">{percent}%</span>
          </div>

          <div className={"boot-welcome" + (ready ? " is-on" : "")}>
            <span className="boot-spark" aria-hidden="true">
              ✦
            </span>
            Welcome to <b>Ebkan Tech</b>
            <span className="boot-ok" aria-hidden="true">
              ✓
            </span>
          </div>
        </div>
      </div>

      <button type="button" className="boot-skip" onClick={finish}>
        Skip ›
      </button>
    </div>
  );
}

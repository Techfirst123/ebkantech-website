/**
 * Shared dark-dashboard primitives.
 *
 * Used by the homepage accordion (ProductDemos) and by each per-product
 * page (ProductPage). Previously this markup existed twice with two
 * near-identical palettes; it now exists once and reads its colours from
 * the .dd-shell token block in ebkan.css.
 *
 * Everything here must stay render-pure — no window/document at render
 * time — because scripts/prerender.mjs runs these through
 * react-dom/server to emit static HTML.
 */

export function Cycle({ stages, accent }) {
  return (
    <div className="dd-cycle-wrap">
      <ol className="dd-cycle">
        {stages.map((s, i) => (
          <li className="dd-cycle-item" key={s}>
            <div className="dd-cycle-node" style={{ borderColor: accent, color: accent }}>
              <span className="dd-cycle-num mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="dd-cycle-label">{s}</span>
            </div>
            {i < stages.length - 1 && (
              <svg
                className="dd-cycle-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke={accent}
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            )}
          </li>
        ))}
      </ol>
      <div className="dd-cycle-loop">
        <svg viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" aria-hidden="true">
          <path d="M4 4v5h5M20 20v-5h-5" />
          <path d="M4.5 15a8 8 0 0 0 14 4.5M19.5 9A8 8 0 0 0 5.5 4.5" />
        </svg>
        <span>Every cycle feeds the next — outcomes retrain the model that runs the next round</span>
      </div>
    </div>
  );
}

export function KpiGrid({ data, accent }) {
  return (
    <div className="dd-kpi-grid">
      {data.map((d) => (
        <div className="dd-kpi" key={d.lbl}>
          <div className="v">{d.val}</div>
          <div className="l">{d.lbl}</div>
          <div className="s" style={{ color: accent }}>
            {d.sub}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ImpactStat({ stat, label, detail, accent }) {
  return (
    <div className="dd-impact" style={{ borderColor: `${accent}55`, background: `${accent}14` }}>
      <div className="dd-impact-stat" style={{ color: accent }}>
        {stat}
      </div>
      <div className="dd-impact-copy">
        <div className="dd-impact-label">{label}</div>
        <p>{detail}</p>
      </div>
    </div>
  );
}

function BarChart({ labels, values, accent }) {
  const max = Math.max(...values);
  return (
    <div className="dd-bars">
      {values.map((v, i) => (
        <div className="dd-bar-col" key={labels[i]}>
          <div
            className="dd-bar"
            style={{ height: `${(v / max) * 100}%`, background: accent }}
          />
          <span className="dd-bar-label mono">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

function LineChart({ labels, values, accent }) {
  const w = 560,
    h = 150,
    pad = 18;
  const max = Math.max(...values),
    min = Math.min(...values);
  const range = max - min || 1;
  const pts = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return [x, y];
  });
  const path = pts.map((p, i) => (i === 0 ? "M" : "L") + p[0] + "," + p[1]).join(" ");
  const area = `${path} L${pts[pts.length - 1][0]},${h - pad} L${pts[0][0]},${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="dd-linechart" preserveAspectRatio="none">
      <path d={area} fill={`${accent}22`} stroke="none" />
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} className="dd-axis" />
      <path d={path} stroke={accent} strokeWidth="2" fill="none" />
      {pts.map((p, i) => (
        <circle key={labels[i]} cx={p[0]} cy={p[1]} r="3" fill={accent} />
      ))}
      {labels.map((l, i) => (
        <text key={l} x={pts[i][0]} y={h - 2} className="dd-axis-label" textAnchor="middle">
          {l}
        </text>
      ))}
    </svg>
  );
}

export function BiChart({ chart, note, accent }) {
  return (
    <div>
      <div className="dd-eyebrow mono">BI report — live view</div>
      {chart.kind === "bar" ? (
        <BarChart labels={chart.labels} values={chart.values} accent={accent} />
      ) : (
        <LineChart labels={chart.labels} values={chart.values} accent={accent} />
      )}
      <p className="dd-chart-note">{note}</p>
    </div>
  );
}

/**
 * The full dashboard body, shared verbatim between the homepage accordion
 * and the product page so the two can never drift apart.
 */
export function DashboardShell({ project, showChrome = true }) {
  const a = project.accentDark;
  return (
    <div className="dd-shell">
      {showChrome && (
        <div className="dd-titlebar">
          <span className="dd-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="dd-url mono">dashboard.ebkantech.com/{project.slug}</span>
        </div>
      )}
      <div className="dd-inner">
        <div className="dd-head-row">
          <div className="dd-eyebrow mono">Full business cycle</div>
          <h3 className="dd-title">{project.name}</h3>
        </div>
        <Cycle stages={project.cycle} accent={a} />
        <KpiGrid data={project.kpis} accent={a} />
        <BiChart chart={project.chart} note={project.chartNote} accent={a} />
        <ImpactStat
          stat={project.impact.stat}
          label={project.impact.label}
          detail={project.impact.detail}
          accent={a}
        />
      </div>
    </div>
  );
}

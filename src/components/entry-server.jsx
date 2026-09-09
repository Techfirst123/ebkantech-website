import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App.jsx";

export { PROJECTS, SITE_URL } from "./data/projects.js";

/**
 * Build-time render entry. scripts/prerender.mjs calls this once per
 * route to produce real HTML, so crawlers get content instead of an
 * empty <div id="root">.
 */
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes.jsx";

export { allRoutes, routeMeta } from "./seo";
export { SITE } from "./data/site";

/**
 * Build-time render entry, used by scripts/prerender.mjs: turns one URL into
 * real HTML so search engines get content and the right <head> without
 * having to run JavaScript.
 */
export function render(url) {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </React.StrictMode>,
  );
}

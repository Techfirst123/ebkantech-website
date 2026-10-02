import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes.jsx";
import "./vendor/bootstrap-grid.scoped.css";
import "./ebkan.css";
import "./showcase.css";
import "./hero-code.css";
import "./category.css";
import "./vibrant.css";
import "./boot.css";

const container = document.getElementById("root");
const tree = (
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);

// Pages are prerendered at build time (scripts/prerender.mjs), so in
// production the HTML is already there: hydrate it instead of rebuilding.
// In `npm run dev` the root is empty, so render normally.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, tree);
} else {
  ReactDOM.createRoot(container).render(tree);
}

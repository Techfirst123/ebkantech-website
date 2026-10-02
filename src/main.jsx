import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import FloatingContact from "./components/FloatingContact.jsx";
import BootScreen from "./components/BootScreen.jsx";
import "./vendor/bootstrap-grid.scoped.css";
import "./ebkan.css";
import "./showcase.css";
import "./hero-code.css";
import "./category.css";
import "./vibrant.css";
import "./boot.css";

// "/" is the full home page; each Scope-of-business category has its own
// page at /services/<slug>, and each product at /products/<id>. vercel.json already rewrites every path to the
// app, so these URLs also work on a hard refresh in production.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* terminal-style loading screen on every fresh page load */}
      <BootScreen />
      <Routes>
        <Route path="/services/:slug" element={<CategoryPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="*" element={<App />} />
      </Routes>
      {/* "Get in touch" tab + WhatsApp button, on every page */}
      <FloatingContact />
    </BrowserRouter>
  </React.StrictMode>
);

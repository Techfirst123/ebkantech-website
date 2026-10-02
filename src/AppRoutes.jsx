import { Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import FloatingContact from "./components/FloatingContact.jsx";
import BootScreen from "./components/BootScreen.jsx";
import useSeo from "./useSeo";

/**
 * The whole app, minus the router — shared by the browser (main.jsx,
 * BrowserRouter) and the build-time prerender (entry-server.jsx,
 * StaticRouter), so both produce exactly the same markup.
 *
 * "/" is the home page; each Scope-of-business category has a page at
 * /services/<slug>, and each product at /products/<id>.
 */
export default function AppRoutes() {
  useSeo();
  return (
    <>
      {/* terminal-style loading screen on every fresh page load */}
      <BootScreen />
      <Routes>
        <Route path="/services/:slug" element={<CategoryPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="*" element={<App />} />
      </Routes>
      {/* "Get in touch" tab + WhatsApp button, on every page */}
      <FloatingContact />
    </>
  );
}

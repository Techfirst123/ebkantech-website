import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import AssistantWidget from "./components/AssistantWidget";

/**
 * Route shell. Each product now has a real URL that can be prerendered,
 * indexed and ranked on its own, rather than six products sharing one
 * homepage and diluting each other.
 *
 * The assistant widget lives here so it persists across navigation
 * instead of remounting per page.
 */
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:slug" element={<ProductPage />} />
        <Route path="*" element={<ProductPage />} />
      </Routes>
      <AssistantWidget />
    </>
  );
}

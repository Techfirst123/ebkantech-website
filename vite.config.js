import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { apiDevServer } from "./scripts/api-dev-server.mjs";

export default defineConfig({
  // apiDevServer runs the api/ handlers on the dev server, so /api/assistant
  // and /api/contact behave locally the same way they do on Vercel.
  plugins: [react(), tailwindcss(), apiDevServer()],
  build: {
    rollupOptions: {
      // Vendor split keeps the shared framework chunk cacheable across
      // navigations instead of reshipping it with every content change.
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) return "vendor-motion";
            if (id.includes("react-router")) return "vendor-router";
            if (id.includes("react")) return "vendor-react";
          }
        },
      },
    },
  },
});

import fs from "node:fs";
import path from "node:path";

/**
 * Runs the api/*.js serverless handlers on the Vite dev server.
 *
 * Vercel executes everything in api/ as serverless functions in
 * production, but `vite dev` only serves the frontend — so without this
 * plugin /api/assistant and /api/contact return index.html locally and
 * every fetch fails at r.json(). This mounts them as dev middleware so
 * local behaviour matches production.
 *
 * Dev only; production is untouched and still served by Vercel.
 */
export function apiDevServer({ dir = "api" } = {}) {
  return {
    name: "api-dev-server",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, "http://localhost");
        if (!url.pathname.startsWith("/api/")) return next();

        const name = url.pathname.replace(/^\/api\//, "").replace(/\/$/, "");
        const file = path.resolve(process.cwd(), dir, `${name}.js`);

        if (!fs.existsSync(file)) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify({ error: `No API route: /api/${name}` }));
        }

        // Collect the JSON body Vercel would have parsed for us.
        let body = {};
        if (req.method !== "GET" && req.method !== "HEAD") {
          const chunks = [];
          for await (const c of req) chunks.push(c);
          const raw = Buffer.concat(chunks).toString("utf8");
          if (raw) {
            try {
              body = JSON.parse(raw);
            } catch {
              body = {};
            }
          }
        }

        // Minimal shim of the Vercel req/res helpers the handlers use.
        const vercelRes = {
          statusCode: 200,
          status(code) {
            this.statusCode = code;
            return this;
          },
          setHeader(k, v) {
            res.setHeader(k, v);
            return this;
          },
          json(payload) {
            res.statusCode = this.statusCode;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(payload));
            return this;
          },
          send(payload) {
            res.statusCode = this.statusCode;
            res.end(typeof payload === "string" ? payload : JSON.stringify(payload));
            return this;
          },
          end(payload) {
            res.statusCode = this.statusCode;
            res.end(payload);
            return this;
          },
        };

        try {
          // Cache-bust so edits to handlers are picked up without a restart.
          const mod = await server.ssrLoadModule(`/${dir}/${name}.js`);
          const handler = mod.default;
          if (typeof handler !== "function") {
            throw new Error(`api/${name}.js has no default export`);
          }
          await handler({ ...req, method: req.method, body, query: Object.fromEntries(url.searchParams) }, vercelRes);
        } catch (err) {
          server.config.logger.error(`[api] /api/${name} failed: ${err.stack || err.message}`);
          if (!res.writableEnded) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: err.message }));
          }
        }
      });
    },
  };
}

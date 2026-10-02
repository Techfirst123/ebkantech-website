/**
 * Builds src/vendor/bootstrap-grid.scoped.css from Bootstrap 5's grid CSS,
 * with every selector placed under `.bs`.
 *
 * Why: the site also uses Tailwind and its own CSS. Loaded globally,
 * Bootstrap's `.row` / `.col` would reshape the contact form and footer,
 * and its `!important` spacing utilities (`mt-4`, `px-3`, …) would override
 * Tailwind's classes of the same name in the Business Intelligence section.
 * Scoped, Bootstrap only applies inside an element with class="bs".
 *
 * Run after upgrading Bootstrap:  node scripts/scope-bootstrap.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import postcss from "postcss";

const require = createRequire(import.meta.url);
// fileURLToPath decodes "%20" etc. — the project folder has a space in its name
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = require.resolve("bootstrap/dist/css/bootstrap-grid.css");
const version = require("bootstrap/package.json").version;
const css = fs.readFileSync(src, "utf8");

const SCOPE = ".bs";
const scopeSelector = (sel) =>
  sel
    .split(",")
    .map((s) => {
      const t = s.trim();
      if (!t) return t;
      // :root / html variable blocks → onto the scope element itself
      if (t === ":root" || t === "html" || t === ":host") return SCOPE;
      return `${SCOPE} ${t}`;
    })
    .join(", ");

const out = postcss.parse(css);
out.walkRules((rule) => {
  // keyframes steps are not selectors
  if (rule.parent?.type === "atrule" && /keyframes$/i.test(rule.parent.name)) return;
  rule.selector = scopeSelector(rule.selector);
});
out.walkComments((c) => {
  if (c.text.startsWith("# sourceMappingURL")) c.remove();
});

const header = `/* Bootstrap ${version} grid — scoped to .bs by scripts/scope-bootstrap.mjs. Do not edit. */\n`;
const dest = path.join(root, "src", "vendor", "bootstrap-grid.scoped.css");
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, header + out.toString());

const rules = [];
out.walkRules((r) => rules.push(r.selector));
const unscoped = rules.filter((s) => s.split(",").some((p) => !p.trim().startsWith(SCOPE)));
console.log(`wrote ${path.relative(root, dest)} — ${rules.length} rules, ${unscoped.length} unscoped`);

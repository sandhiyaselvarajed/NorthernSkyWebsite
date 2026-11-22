// GitHub Pages: give every page its own folder (docs/projects/index.html etc.) so links and
// refreshes return the page directly, and keep 404.html as a fallback for unknown URLs.
import { copyFileSync, mkdirSync } from "node:fs";
const pages = ["about", "services", "projects", "locations", "careers", "contact", "privacy"];
for (const p of pages) {
  mkdirSync(`docs/${p}`, { recursive: true });
  copyFileSync("docs/index.html", `docs/${p}/index.html`);
}
copyFileSync("docs/index.html", "docs/404.html");
console.log(`postbuild: ${pages.length} page folders + 404.html created`);

// GitHub Pages: give every page its own folder (dist/projects/index.html etc.) so links and
// refreshes return the page directly, and keep 404.html as a fallback for unknown URLs.
import { copyFileSync, mkdirSync } from "node:fs";
const pages = ["about", "services", "projects", "locations", "careers", "contact", "privacy"];
for (const p of pages) {
  mkdirSync(`dist/${p}`, { recursive: true });
  copyFileSync("dist/index.html", `dist/${p}/index.html`);
}
copyFileSync("dist/index.html", "dist/404.html");
console.log(`postbuild: ${pages.length} page folders + 404.html created`);

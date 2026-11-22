// GitHub Pages: serve the app for any unknown URL instead of a bare 404.
import { copyFileSync } from "node:fs";
copyFileSync("dist/index.html", "dist/404.html");
console.log("postbuild: dist/404.html created");

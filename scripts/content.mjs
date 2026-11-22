// Reads the spreadsheets in content/ and turns them into data the website uses.
// Runs automatically before `npm run dev` and `npm run build`.
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";

const slug = (file) => path.parse(file).name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Minimal CSV reader (handles quotes and commas inside quotes, as Excel writes them).
function parseCSV(text) {
  text = text.replace(/^﻿/, "");
  const rows = []; let row = []; let cell = ""; let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === "," || c === ";" && !text.slice(0, 200).includes(",")) { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [head, ...body] = rows.filter((r) => r.some((x) => x.trim()));
  const keys = head.map((h) => h.trim().toLowerCase());
  return body.map((r) => Object.fromEntries(keys.map((k, i) => [k, (r[i] ?? "").trim()])));
}

const read = (f) => (existsSync(f) ? parseCSV(readFileSync(f, "utf8")) : []);
const shown = (r) => !/^(no|n|hide|false|0)$/i.test(r.show || "yes");
const images = new Set(existsSync("src/assets/img") ? readdirSync("src/assets/img").map((f) => f.replace(/-\d+\.webp$/, "")) : []);
const warnings = [];

const projects = read("content/projects.csv").filter(shown).map((r, i) => {
  const status = /complete|done|finish/i.test(r.status) ? "Completed" : "Ongoing";
  let image = r.photo ? slug(r.photo) : "";
  if (image && !images.has(image)) { warnings.push(`projects.csv row ${i + 2}: photo "${r.photo}" not found in content/photos`); image = ""; }
  if (!r.client) warnings.push(`projects.csv row ${i + 2}: Client is empty`);
  return { id: `p${i}`, status, client: r.client, asset: r.size, scope: r.scope, location: r.location, image: image || undefined };
});

const trackRecord = read("content/earlier-projects.csv").filter(shown).map((r) => ({
  customer: r.customer, via: r["via (main contractor)"] || r.via || "", type: r.type, location: r.location, size: r.size, scope: r.scope,
}));

writeFileSync("src/data/projects.json", JSON.stringify({ projects, trackRecord }, null, 2));
console.log(`content: ${projects.length} projects, ${trackRecord.length} earlier projects`);
warnings.forEach((w) => console.warn("content: WARNING " + w));

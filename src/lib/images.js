// Builds responsive srcset strings from the optimised WebP files in src/assets/img.
const files = import.meta.glob("../assets/img/*.webp", { eager: true, query: "?url", import: "default" });
const logos = import.meta.glob("../assets/logos/*", { eager: true, query: "?url", import: "default" });
const icons = import.meta.glob("../assets/icons/*.svg", { eager: true, query: "?url", import: "default" });

const byName = {};
for (const [path, url] of Object.entries(files)) {
  const m = path.match(/\/([^/]+)-(\d+)\.webp$/);
  if (!m) continue;
  (byName[m[1]] ||= []).push({ w: Number(m[2]), url });
}
for (const list of Object.values(byName)) list.sort((a, b) => a.w - b.w);

export function picture(name, preferWidth = 960) {
  const list = byName[name];
  if (!list) {
    if (import.meta.env.DEV) console.warn(`Image "${name}" not found in src/assets/img`);
    return { src: "", srcSet: "" };
  }
  const fallback = list.find((x) => x.w >= preferWidth) || list[list.length - 1];
  return { src: fallback.url, srcSet: list.map((x) => `${x.url} ${x.w}w`).join(", ") };
}

export const hasImage = (name) => !!(name && byName[name]);

export const logoUrl = (file) => logos[`../assets/logos/${file}`];
export const iconUrl = (name) => icons[`../assets/icons/${name}.svg`];

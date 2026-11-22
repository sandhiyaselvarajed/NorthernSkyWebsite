// Converts photos in content/photos/ (NOT committed to git, they are large)
// into small responsive WebP files in src/assets/img/ (committed).
// Runs automatically before `npm run dev` and `npm run build`.
// Only new or changed photos are processed, so it is quick after the first run.
import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const IN = "content/photos";
const OUT = "src/assets/img";
const WIDTHS = [480, 960, 1600, 2400];
const QUALITY = 78;

export const slug = (file) => path.parse(file).name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

if (!existsSync(IN)) {
  console.log("images: no content/photos folder here, using the images already in src/assets/img");
  process.exit(0);
}
await mkdir(OUT, { recursive: true });
const files = (await readdir(IN)).filter((f) => /\.(jpe?g|png|webp|heic|heif|tiff?)$/i.test(f));
let done = 0;
for (const file of files) {
  const name = slug(file);
  const src = path.join(IN, file);
  const first = path.join(OUT, `${name}-480.webp`);
  if (existsSync(first) && (await stat(first)).mtimeMs >= (await stat(src)).mtimeMs) continue; // up to date
  try {
    const img = sharp(src).rotate(); // respect phone orientation
    const { width } = await img.metadata();
    const sizes = WIDTHS.filter((w) => w <= width);
    if (!sizes.length || sizes[sizes.length - 1] < Math.min(width, 2400)) sizes.push(Math.min(width, 2400));
    for (const w of new Set(sizes)) {
      await img.clone().resize({ width: w, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(path.join(OUT, `${name}-${w}.webp`));
    }
    done++;
    console.log(`images: ${file} -> ${name}`);
  } catch (e) {
    console.warn(`images: could not read ${file} (${e.message.split("\n")[0]}). If it is an iPhone HEIC photo, save it as JPG and try again.`);
  }
}
console.log(`images: ${done} new/changed photo(s) processed, ${files.length} in content/photos`);

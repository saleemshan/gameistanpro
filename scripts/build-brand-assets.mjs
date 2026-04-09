/**
 * From `public/images/brand/gameistan-pro-logo-source.png`:
 * - `public/images/brand/gameistan-pro-logo.png` (nav, h=80, transparent)
 * - `app/icon.png` (512×512, logo letterboxed, transparent)
 * - `app/apple-icon.png` (180×180, same)
 *
 * White / light gray flat backgrounds → transparent (same heuristic as before).
 */
import sharp from "sharp";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const src = resolve(root, "public/images/brand/gameistan-pro-logo-source.png");
const navOut = resolve(root, "public/images/brand/gameistan-pro-logo.png");
const iconOut = resolve(root, "app/icon.png");
const appleOut = resolve(root, "app/apple-icon.png");

if (!existsSync(src)) {
  console.error("Missing:", src);
  process.exit(1);
}

function isBackgroundRgb(r, g, b) {
  const l = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  const s =
    max === min || max === 0 ? 0 : (max - min) / (1 - Math.abs(2 * l - 1) + 1e-6);
  return l > 0.88 && s < 0.12;
}

function removeBackgroundOnRaw(data, width, height) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (isBackgroundRgb(r, g, b)) data[i + 3] = 0;
    }
  }
}

const { data, info } = await sharp(src)
  .ensureAlpha()
  .rotate()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
if (channels !== 4) {
  console.error("Expected RGBA, got channels:", channels);
  process.exit(1);
}

removeBackgroundOnRaw(data, width, height);

const rgbaPng = await sharp(data, {
  raw: { width, height, channels: 4 },
})
  .png({ compressionLevel: 9 })
  .toBuffer();

const trimmed = await sharp(rgbaPng)
  .trim({ threshold: 2 })
  .png({ compressionLevel: 9 })
  .toBuffer();

const NAV_H = 80;
await sharp(trimmed)
  .resize({ height: NAV_H, fit: "inside" })
  .png({ compressionLevel: 9 })
  .toFile(navOut);

const navMeta = await sharp(navOut).metadata();
console.log("nav", navOut, `${navMeta.width}x${navMeta.height}`);

await sharp(trimmed)
  .resize(512, 512, {
    fit: "contain",
    position: "centre",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png({ compressionLevel: 9 })
  .toFile(iconOut);

console.log("icon", iconOut, "512x512");

await sharp(trimmed)
  .resize(180, 180, {
    fit: "contain",
    position: "centre",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png({ compressionLevel: 9 })
  .toFile(appleOut);

console.log("apple", appleOut, "180x180");

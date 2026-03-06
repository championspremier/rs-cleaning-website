#!/usr/bin/env node
/**
 * Generates favicon.ico and apple-touch-icon.png from public/dark-logo.png
 * Run: node scripts/generate-favicon.mjs
 */

import sharp from "sharp";
import toIco from "to-ico";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const inputPath = join(root, "public", "dark-logo.png");
const faviconPath = join(root, "src", "app", "favicon.ico");
const appleTouchPath = join(root, "public", "apple-touch-icon.png");

async function generate() {
  const inputBuffer = readFileSync(inputPath);

  // 1. Generate 32x32 favicon.ico
  const faviconPng = await sharp(inputBuffer)
    .resize(32, 32)
    .png()
    .toBuffer();

  const icoBuffer = await toIco([faviconPng]);
  mkdirSync(dirname(faviconPath), { recursive: true });
  writeFileSync(faviconPath, icoBuffer);
  console.log("Generated:", faviconPath);

  // 2. Generate 180x180 apple-touch-icon.png
  const appleTouchBuffer = await sharp(inputBuffer)
    .resize(180, 180)
    .png()
    .toBuffer();

  writeFileSync(appleTouchPath, appleTouchBuffer);
  console.log("Generated:", appleTouchPath);
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});

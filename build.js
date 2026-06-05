const esbuild = require("esbuild");
const { readFileSync } = require("fs");

const pkg = JSON.parse(readFileSync("./package.json", "utf8"));

const banner = `/**
 * NoJS Elements v${pkg.version} — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author ${pkg.author}
 * @homepage https://elements.no-js.dev/
 * @license MIT
 * @repository https://github.com/ErickXavier/nojs-elements
 */`;

const shared = {
  bundle: true,
  banner: { js: banner },
  target: ["es2020"],
};

async function build() {
  // ── CDN (IIFE) ────────────────────────────────────────────────────
  await esbuild.build({
    ...shared,
    entryPoints: ["src/cdn.js"],
    outfile: "dist/iife/nojs-elements.js",
    format: "iife",
    minify: true,
    sourcemap: true,
  });

  // ── ESM ─────────────────────────���───────────────────��─────────────
  await esbuild.build({
    ...shared,
    entryPoints: ["src/index.js"],
    outfile: "dist/esm/nojs-elements.js",
    format: "esm",
    minify: true,
    sourcemap: true,
  });

  // ── CJS ─────────────────────────────────────��─────────────────────
  await esbuild.build({
    ...shared,
    entryPoints: ["src/index.js"],
    outfile: "dist/cjs/nojs-elements.js",
    format: "cjs",
    minify: true,
    sourcemap: true,
  });

  console.log("✓ Build complete!");
  console.log("  dist/iife/nojs-elements.js — CDN / <script> tag");
  console.log("  dist/esm/nojs-elements.js  — ES module (import)");
  console.log("  dist/cjs/nojs-elements.js  — CommonJS (require)");
}

build().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});

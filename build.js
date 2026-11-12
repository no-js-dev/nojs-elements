const esbuild = require("esbuild");
const { readFileSync, writeFileSync } = require("fs");

const pkg = JSON.parse(readFileSync("./package.json", "utf8"));

const banner = `/**
 * NoJS Elements v${pkg.version} — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author ${pkg.author}
 * @homepage https://elements.no-js.dev/
 * @license MIT
 * @repository https://github.com/no-js-dev/nojs-elements
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

  // ── Validation engine (NoJS-Server contract `validation`) ──────────
  // The pure engine as a standalone ES module, unminified, next to the
  // CJS and ESM bundles the server loads the plugin from.
  const engine = `${banner}\n${readFileSync("src/validate/engine.js", "utf8")}`;
  for (const dir of ["dist/esm", "dist/cjs"]) {
    writeFileSync(`${dir}/validate-engine.mjs`, engine);
  }

  console.log("✓ Build complete!");
  console.log("  dist/iife/nojs-elements.js — CDN / <script> tag");
  console.log("  dist/esm/nojs-elements.js  — ES module (import)");
  console.log("  dist/cjs/nojs-elements.js  — CommonJS (require)");
  console.log("  dist/{esm,cjs}/validate-engine.mjs — validation engine (server)");
}

build().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});

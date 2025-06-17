import { defineConfig } from "vite";

export default defineConfig({
  base: "./", // Keep this for Vercel deployment
  css: {
    postcss: "./postcss.config.js",
  },
  build: {
    outDir: "dist",
    assetsInlineLimit: 4096,
  },
});

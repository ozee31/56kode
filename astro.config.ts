import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import { mdastReadingTimePlugin } from "./src/mdast/mdast-reading-time";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [react(), sitemap()],
  // Astro 7 defaults this to 'jsx', which strips the whitespace between
  // adjacent inline elements. Pinned to the v6 behaviour: the header logo,
  // breadcrumbs and footer rely on those spaces being rendered.
  compressHTML: true,
  markdown: {
    // `satteri()` CONFIGURES the default processor rather than replacing it, so
    // GFM, smart punctuation and the github-slugger heading IDs all stay --
    // which the anchor-link script in ArticleBehaviors.astro and the "On this
    // page" rail both read back from the DOM. Swapping in `unified()` here
    // would drop all three.
    processor: satteri({
      mdastPlugins: [mdastReadingTimePlugin],
    }),
    shikiConfig: {
      // Single theme: the site is dark-only, so the dual-theme setup (and the
      // `html[data-theme="dark"] pre span { ... !important }` override it needed
      // in base.css) is gone. `min-dark` is low-chroma on purpose -- `night-owl`
      // pulls blue and would fight the phosphor accent and the AI accent.
      // For more themes, visit https://shiki.style/themes
      theme: "min-dark",
      wrap: true,
    },
  },
  scopedStyleStrategy: "where",
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: { exclude: ["@resvg/resvg-js"] },
  },
});

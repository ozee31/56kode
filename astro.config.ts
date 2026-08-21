import { defineConfig } from "astro/config";
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
    // `processor` is omitted on purpose: Sätteri is the default in Astro 7 and
    // covers everything this blog used remark for. It applies GFM and smart
    // punctuation, and always adds heading IDs via github-slugger -- which the
    // anchor-link scripts in PostDetails.astro and AiRadarDetails.astro read
    // back from the DOM.
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      wrap: true,
    },
  },
  scopedStyleStrategy: "where",
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: { exclude: ["@resvg/resvg-js"] },
  },
});

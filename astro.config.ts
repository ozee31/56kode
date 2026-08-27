import { defineConfig, fontProviders } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import { mdastReadingTimePlugin } from "./src/mdast/mdast-reading-time";
import { hastImageAttrsPlugin } from "./src/mdast/hast-image-attrs";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";

/**
 * Polices servies depuis notre origine, avec les fichiers versionnés dans
 * `src/assets/fonts/`. Voir le README qui s'y trouve pour le pourquoi.
 *
 * Les plages Unicode sont celles des sous-ensembles Google correspondants :
 * grâce à `unicode-range`, un visiteur ne télécharge `latin-ext` que si la
 * page contient un caractère de sa plage.
 */
const PLEX_SUBSETS = {
  latin: [
    "U+0000-00FF",
    "U+0131",
    "U+0152-0153",
    "U+02BB-02BC",
    "U+02C6",
    "U+02DA",
    "U+02DC",
    "U+0304",
    "U+0308",
    "U+0329",
    "U+2000-206F",
    "U+20AC",
    "U+2122",
    "U+2191",
    "U+2193",
    "U+2212",
    "U+2215",
    "U+FEFF",
    "U+FFFD",
  ],
  "latin-ext": [
    "U+0100-02BA",
    "U+02BD-02C5",
    "U+02C7-02CC",
    "U+02CE-02D7",
    "U+02DD-02FF",
    "U+0304",
    "U+0308",
    "U+0329",
    "U+1D00-1DBF",
    "U+1E00-1E9F",
    "U+1EF2-1EFF",
    "U+2020",
    "U+20A0-20AB",
    "U+20AD-20C0",
    "U+2113",
    "U+2C60-2C7F",
    "U+A720-A7FF",
  ],
} as const;

// 400, 500 et 600 : les seuls poids utilisés par le site. Ni italique, ni 700.
const PLEX_WEIGHTS = [400, 500, 600] as const;

type PlexVariant = {
  src: [string, ...string[]];
  weight: (typeof PLEX_WEIGHTS)[number];
  style: "normal";
  unicodeRange: [string, ...string[]];
};

const plexVariants = (
  family: "mono" | "sans"
): [PlexVariant, ...PlexVariant[]] => {
  const variants = PLEX_WEIGHTS.flatMap(weight =>
    Object.entries(PLEX_SUBSETS).map(([subset, unicodeRange]): PlexVariant => ({
      src: [
        `./src/assets/fonts/ibm-plex-${family}-${subset}-${weight}-normal.woff2`,
      ],
      weight,
      style: "normal",
      unicodeRange: [...unicodeRange] as [string, ...string[]],
    }))
  );
  // 6 entrées par famille : 3 poids x 2 sous-ensembles.
  return variants as [PlexVariant, ...PlexVariant[]];
};

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  fonts: [
    {
      provider: fontProviders.local(),
      name: "IBM Plex Mono",
      cssVariable: "--font-plex-mono",
      fallbacks: ["ui-monospace", "monospace"],
      options: { variants: plexVariants("mono") },
    },
    {
      provider: fontProviders.local(),
      name: "IBM Plex Sans",
      cssVariable: "--font-plex-sans",
      fallbacks: ["system-ui", "sans-serif"],
      options: { variants: plexVariants("sans") },
    },
  ],
  integrations: [
    react(),
    sitemap({
      // `/posts/1/`, `/ai-radar/1/` et `/tech-watch/1/` rendent la même page
      // que leur URL de base. Elles restent servies — elles sont peut-être
      // indexées — mais elles pointent leur canonique vers la page de base et
      // n'ont rien à faire dans le sitemap.
      filter: page => !/\/1\/$/.test(page),
    }),
  ],
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
      hastPlugins: [hastImageAttrsPlugin],
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

import fs from "node:fs";
import path from "node:path";
import type { FontStyle, FontWeight } from "satori";

export type FontOptions = {
  name: string;
  data: ArrayBuffer;
  weight: FontWeight | undefined;
  style: FontStyle | undefined;
};

/**
 * Polices des images Open Graph, lues sur le disque.
 *
 * L'ancienne version les téléchargeait depuis Google à chaque build, en
 * analysant le CSS renvoyé avec une expression régulière — un changement de
 * format de réponse, une panne ou un retrait de la famille du catalogue et la
 * génération des images cassait. Les fichiers sont maintenant dans le dépôt.
 *
 * Satori ne sait pas lire le woff2 : ces trois fers sont donc en woff. Le
 * sous-ensemble `latin` suffit — aucun des 75 titres, descriptions ou auteurs
 * du contenu n'a de caractère hors de sa plage.
 */
const FONTS = [
  {
    file: "ibm-plex-mono-latin-400-normal.woff",
    name: "IBM Plex Mono",
    weight: 400,
  },
  {
    file: "ibm-plex-mono-latin-500-normal.woff",
    name: "IBM Plex Mono",
    weight: 500,
  },
  {
    file: "ibm-plex-sans-latin-600-normal.woff",
    name: "IBM Plex Sans",
    weight: 600,
  },
] as const;

let cached: FontOptions[] | undefined;

export default function loadFonts(): FontOptions[] {
  // Une seule lecture disque pour les 24 images du build.
  if (cached) return cached;

  cached = FONTS.map(({ file, name, weight }) => {
    // Résolu depuis la racine du projet, pas depuis `import.meta.url` : ce
    // module est empaqueté dans `dist/.prerender/` au build, d'où son URL ne
    // pointe plus vers `src/`.
    const buffer = fs.readFileSync(
      path.join(process.cwd(), "src/assets/fonts", file)
    );
    return {
      name,
      data: buffer.buffer.slice(
        buffer.byteOffset,
        buffer.byteOffset + buffer.byteLength
      ) as ArrayBuffer,
      weight: weight as FontWeight,
      style: "normal" as FontStyle,
    };
  });

  return cached;
}

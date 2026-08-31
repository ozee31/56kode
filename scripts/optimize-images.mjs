/**
 * Recompresse les images de `public/assets/` sur place.
 *
 * Sur place, et pas via le pipeline d'images d'Astro : ces fichiers sont
 * référencés en chemins absolus (`/assets/posts/…`) depuis le markdown des
 * articles, qui ne doit pas bouger. Mêmes chemins, mêmes noms, mêmes
 * extensions — seuls les octets changent.
 *
 * Deux traitements :
 *
 * - **Recompression** en PNG palette. Les captures d'écran du blog ont peu de
 *   couleurs distinctes (1 050 pour la plus chargée), la quantification en 256
 *   couleurs y est visuellement neutre. Gain mesuré : environ −75 %.
 * - **Redimensionnement**, uniquement pour les fichiers listés dans `RESIZE`.
 *   Les captures d'article font 820 à 840 px pour une colonne de lecture de
 *   653 px, soit un ratio de 1,2 à 1,3× : les réduire dégraderait l'affichage
 *   sur écran dense. On ne touche que ce qui est réellement surdimensionné.
 *
 * Idempotent, et c'est structurel : un fichier déjà en palette et déjà à la
 * bonne largeur est ignoré. Sans ce garde-fou, chaque passage requantifiait
 * une image déjà quantifiée — quatre passages faisaient fondre le total de
 * 1,17 à 0,99 Mo, en rongeant la qualité à chaque fois.
 *
 * Usage : `node scripts/optimize-images.mjs [--dry]`
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = "public/assets";
const DRY = process.argv.includes("--dry");

/**
 * Largeurs cibles, en pixels, pour les seuls fichiers plus larges que ce que
 * leur affichage réclame. `1306` = deux fois la colonne de lecture (653 px),
 * `240` = deux fois l'avatar (96 px à l'écran).
 */
const RESIZE = {
  "avatar.png": 240,
  "posts/responsive-images-a-quick-example-with-react/desktop-preview.png": 1306,
  "posts/ai-powered-development-chrome-extension-n8n-automation-claude-code/workflow.png": 1306,
  "posts/text-truncation-with-ellipsis-on-multiple-lines/caniuse.png": 1306,
  "posts/redesign-blog-claude-design-claude-code/old-website.png": 1306,
};

const files = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.png$/i.test(entry.name)) files.push(full);
  }
})(ROOT);

let before = 0;
let after = 0;
let rewritten = 0;

for (const file of files.sort()) {
  const rel = path.relative(ROOT, file);
  const source = fs.readFileSync(file);
  const { width, isPalette } = await sharp(source).metadata();

  const target = RESIZE[rel];
  const needsResize = Boolean(target && width > target);

  // Déjà traité : on ne le repasse pas à la moulinette, une requantification
  // d'image quantifiée perd des couleurs sans rien gagner de réel.
  if (isPalette && !needsResize) {
    before += source.length;
    after += source.length;
    console.log(`   =  ${rel}  (déjà optimisé)`);
    continue;
  }

  let pipeline = sharp(source);
  if (needsResize) pipeline = pipeline.resize({ width: target });

  const output = await pipeline
    .png({ palette: true, quality: 90, effort: 10, compressionLevel: 9 })
    .toBuffer();

  before += source.length;

  // Ne jamais alourdir un fichier.
  if (output.length >= source.length) {
    after += source.length;
    console.log(`   =  ${rel}  (déjà optimal, laissé tel quel)`);
    continue;
  }

  after += output.length;
  rewritten += 1;
  const gain = Math.round((1 - output.length / source.length) * 100);
  const size = n => `${String(Math.round(n / 1024)).padStart(5)} Ko`;
  console.log(
    `${size(source.length)} → ${size(output.length)}  −${String(gain).padStart(2)}%  ${needsResize ? `${width}→${target}px  ` : ""}${rel}`
  );

  if (!DRY) fs.writeFileSync(file, output);
}

const mo = n => (n / 1048576).toFixed(2);
console.log(
  `\n${rewritten} fichier(s) réécrit(s) sur ${files.length}` +
    `\n${mo(before)} Mo → ${mo(after)} Mo  (−${Math.round((1 - after / before) * 100)} %)` +
    (DRY ? "\n(essai à blanc : rien n'a été écrit)" : "")
);

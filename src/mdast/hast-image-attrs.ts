import fs from "node:fs";
import path from "node:path";
import { defineHastPlugin } from "satteri";

/**
 * Attributs manquants sur les images du markdown : `loading`, `decoding`, et
 * les dimensions réelles.
 *
 * Le markdown ne peut pas les porter — `![alt](src)` ne produit qu'un `src` et
 * un `alt` — et il est hors de question de le passer en HTML brut juste pour
 * ça. C'est donc le processeur qui enrichit la sortie : les fichiers de
 * contenu restent intacts.
 *
 * Ce que ça corrige, mesuré avant :
 *
 * - les six images d'un article partaient **toutes** à 305 ms, alors que la
 *   première commence à 1 186 px du haut pour une fenêtre de 820 px : aucune
 *   n'est jamais visible au chargement ;
 * - aucune des 15 balises `<img>` du site n'avait de `width`/`height`, donc le
 *   navigateur ne pouvait réserver aucune place et la page se réorganisait à
 *   mesure que les images arrivaient.
 */

/** Racine des fichiers servis, à laquelle correspondent les `src` absolus. */
const PUBLIC_DIR = "public";

/**
 * Dimensions lues dans l'en-tête du fichier.
 *
 * Une lecture de 24 octets suffit pour le PNG, seul format utilisé par le
 * contenu. Les autres formats ressortent `undefined` : ils reçoivent quand
 * même `loading` et `decoding`, simplement pas de dimensions — mieux vaut ça
 * qu'un chiffre inventé.
 */
function readPngSize(
  file: string
): { width: number; height: number } | undefined {
  let fd: number | undefined;
  try {
    fd = fs.openSync(file, "r");
    const header = Buffer.alloc(24);
    if (fs.readSync(fd, header, 0, 24, 0) < 24) return undefined;
    // Signature PNG, puis le chunk IHDR dont les deux premiers entiers 32 bits
    // big-endian sont la largeur et la hauteur.
    if (header.toString("latin1", 1, 4) !== "PNG") return undefined;
    return { width: header.readUInt32BE(16), height: header.readUInt32BE(20) };
  } catch {
    return undefined;
  } finally {
    if (fd !== undefined) fs.closeSync(fd);
  }
}

/** Une image par chemin suffit : le build rend 268 pages. */
const cache = new Map<string, { width: number; height: number } | undefined>();

function sizeOf(src: string) {
  if (!cache.has(src)) {
    cache.set(
      src,
      readPngSize(path.join(process.cwd(), PUBLIC_DIR, src.replace(/^\//, "")))
    );
  }
  return cache.get(src);
}

export const hastImageAttrsPlugin = defineHastPlugin({
  name: "hast-image-attrs",

  element: {
    filter: ["img"],
    visit(node) {
      const properties = node.properties ?? {};
      const src = properties.src;

      // Seules les images servies par le site sont mesurables. Une URL externe
      // garde le chargement différé, sans dimensions.
      const size =
        typeof src === "string" && src.startsWith("/")
          ? sizeOf(src)
          : undefined;

      return {
        ...node,
        properties: {
          ...properties,
          loading: "lazy",
          decoding: "async",
          ...(size && { width: size.width, height: size.height }),
        },
      };
    },
  },
});

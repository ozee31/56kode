import type { CollectionEntry } from "astro:content";

type Renderable = CollectionEntry<"blog"> | CollectionEntry<"aiRadar">;

/**
 * Temps de lecture calculé au build par `src/mdast/mdast-reading-time.ts`.
 *
 * La valeur est posée dans le frontmatter par le plugin mdast et Astro la
 * conserve dans `rendered.metadata.frontmatter` — donc lisible directement
 * depuis `getCollection`, sans avoir à appeler `render()` sur chaque entrée
 * d'une page de liste.
 *
 * Retourne `undefined` plutôt qu'une valeur inventée si le plugin n'a pas
 * tourné : mieux vaut ne rien afficher qu'un chiffre faux.
 */
export default function getMinutesRead(entry: Renderable): string | undefined {
  const frontmatter = (
    entry as {
      rendered?: { metadata?: { frontmatter?: Record<string, unknown> } };
    }
  ).rendered?.metadata?.frontmatter;

  const value = frontmatter?.minutesRead;
  return typeof value === "string" ? value : undefined;
}

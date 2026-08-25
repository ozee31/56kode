/**
 * Sommaire du rail « ON THIS PAGE », construit depuis le HTML rendu.
 *
 * Les IDs sont déjà posés par le markdown processor (github-slugger, cf. le
 * commentaire d'astro.config.ts) et sont par ailleurs relus par le script
 * d'ancres de ArticleBehaviors — on lit donc la même source de vérité, sans
 * introduire de second système de slugs.
 *
 * Le TOC remark existant (`h2#table-of-contents`) reste masqué par base.css :
 * le rail le remplace visuellement sans toucher au markdown des articles.
 */
export interface Heading {
  depth: number;
  slug: string;
  text: string;
}

const HEADING_RE = /<h([23])[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g;

export default function extractHeadings(
  html: string | undefined | null
): Heading[] {
  if (!html) return [];

  const headings: Heading[] = [];

  for (const match of html.matchAll(HEADING_RE)) {
    const [, depth, slug, inner] = match;

    // Le TOC généré par remark ne doit pas se lister lui-même.
    if (slug === "table-of-contents") continue;

    const text = inner
      .replace(/<[^>]*>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();

    if (text) headings.push({ depth: Number(depth), slug, text });
  }

  return headings;
}

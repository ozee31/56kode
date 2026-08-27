import { getCollection } from "astro:content";
import postFilter from "./postFilter";

/**
 * Compteurs affichés par la StatusBar (« 28 POSTS · 52 RADAR ENTRIES »).
 *
 * Les maquettes montrent des chiffres en dur ; on rend les vrais. Les brouillons
 * et les articles programmés sont exclus des posts via `postFilter`, exactement
 * comme dans les listes, pour que le compteur corresponde à ce qui est publié.
 *
 * Appelé au build depuis plusieurs layouts. Le résultat est mémoïsé : sans ça,
 * les 268 pages rechargeraient les 215 fichiers de contenu à chaque rendu.
 */
export interface SiteStats {
  posts: number;
  radar: number;
  techwatch: number;
}

let cached: SiteStats | undefined;

export default async function getSiteStats(): Promise<SiteStats> {
  if (cached) return cached;

  const [blog, radar, techwatch] = await Promise.all([
    getCollection("blog", postFilter),
    getCollection("aiRadar"),
    getCollection("techwatch"),
  ]);

  cached = {
    posts: blog.length,
    radar: radar.length,
    techwatch: techwatch.length,
  };

  return cached;
}

/**
 * Hôte d'une URL sortante, sans `www.`, pour la ligne de méta des entrées
 * AI Radar (« 21.05.2026 · THESTATEOFBRAND.COM »).
 *
 * Le design system pose que le titre d'une entrée pointe toujours vers la
 * source : afficher le domaine évite au lecteur de découvrir la destination
 * seulement après le clic.
 */
export default function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    // Une URL malformée dans le front-matter ne doit pas casser le build.
    return "";
  }
}

/**
 * Miroir TypeScript des tokens de couleur, pour les images Open Graph.
 *
 * Satori rend du JSX en SVG hors du navigateur : il ne lit ni le CSS ni les
 * variables. C'est la seule exception documentée à la règle « aucune couleur
 * littérale hors tokens.css ».
 *
 * ⚠️ Ces valeurs doivent rester synchronisées à la main avec `src/styles/tokens.css`.
 * L'ancienne version l'avait oublié : elle utilisait `#fefbfb` là où le site
 * déclarait `#fbfefb` — les chiffres inversés, jamais rattrapés.
 */
export const OG = {
  canvas: "#070a09", // --color-bg-canvas
  raised: "#0b0f0d", // --color-bg-raised
  line: "#23302a", // --color-border-default
  accent: "#6ef7a5", // --color-accent-primary
  textStrong: "#f4fbf7", // --color-text-primary
  textMuted: "#8ba396", // --color-text-muted
} as const;

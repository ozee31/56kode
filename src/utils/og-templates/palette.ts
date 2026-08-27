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
  feature: "#0c120f", // --color-bg-feature
  line: "#23302a", // --color-border-default
  accent: "#6ef7a5", // --color-accent-primary
  signalTrack: "#556b5f", // --color-signal-track
  textStrong: "#f4fbf7", // --color-text-primary
  textBody: "#c3d2ca", // --color-text-body
  textMuted: "#8ba396", // --color-text-muted
} as const;

/**
 * Les deux familles du site. Le chrome (libellés, méta, compteurs) est en mono,
 * le titre en sans — exactement le partage qu'appliquent les gabarits de page.
 * L'ancienne image rendait tout en mono, ce qui la faisait lire comme un autre
 * site que celui vers lequel elle pointe.
 */
export const OG_FONT = {
  chrome: "IBM Plex Mono",
  reading: "IBM Plex Sans",
} as const;

/**
 * Barres de réception, à l'échelle de l'image : les hauteurs 3/5/7/10/12 de
 * `--signal-step-*` doublées, sinon elles disparaissent à 1200px de large.
 */
export const OG_SIGNAL_STEPS = [6, 10, 14, 20, 24] as const;

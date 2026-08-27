# IBM Plex — fichiers versionnés

Les polices sont dans le dépôt, pas chargées depuis un tiers. Deux raisons :

1. **Aucune donnée de visiteur ne sort.** Charger depuis `fonts.googleapis.com`
   envoyait l'IP, l'User-Agent et le Referer de chaque visiteur à Google LLC
   aux États-Unis, à chaque page vue, sans consentement.
2. **Le build ne dépend de personne.** Ni une panne, ni un changement de format
   de réponse, ni un retrait de la famille du catalogue ne peuvent casser le
   site ou la génération des images Open Graph.

## Ce qu'il y a ici

| Fichiers                                                                           | Format | Pour qui                                            |
| ---------------------------------------------------------------------------------- | ------ | --------------------------------------------------- |
| `*-latin-*.woff2`, `*-latin-ext-*.woff2`                                           | woff2  | le site, via `fonts` dans `astro.config.ts`         |
| `ibm-plex-mono-latin-{400,500}-normal.woff`, `ibm-plex-sans-latin-600-normal.woff` | woff   | les images Open Graph, via `src/utils/loadFonts.ts` |

Satori ne sait pas lire le woff2 — d'où les trois `.woff`. Le sous-ensemble
`latin` leur suffit : les 75 titres, descriptions et auteurs du contenu n'ont
aucun caractère hors de sa plage.

Poids retenus : 400, 500, 600. Ce sont les seuls utilisés (`font-medium` une
fois, `font-semibold` dix-neuf fois, le reste en 400). Pas d'italique, pas de 700.

## Origine et mise à jour

Extraits de `@fontsource/ibm-plex-mono` et `@fontsource/ibm-plex-sans` 5.3.0,
qui redécoupent la distribution officielle IBM Plex par sous-ensemble Unicode.
Pour mettre à jour : `npm pack @fontsource/ibm-plex-mono @fontsource/ibm-plex-sans`,
puis recopier les fichiers de `files/` portant les mêmes noms.

Licence SIL Open Font License 1.1, voir `LICENSE.txt`. Elle autorise la
redistribution, y compris intégrée à un site.

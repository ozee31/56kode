import getReadingTime from "reading-time";
import { defineMdastPlugin } from "satteri";

/**
 * Temps de lecture, injecté dans le frontmatter au parsing du markdown.
 *
 * Suit la recette officielle Astro (docs/recipes/reading-time), version Sätteri :
 * on *configure* le processeur par défaut au lieu de le remplacer, donc les IDs
 * de titre, GFM et la ponctuation intelligente restent en place — ce dont
 * dépendent le rail « ON THIS PAGE » et le script d'ancres.
 *
 * Le comptage est délégué à `reading-time`, qui gère les frontières de mots et
 * les cas limites qu'une regex maison traite mal.
 */

/**
 * Compter ou non le contenu des blocs de code.
 *
 * `false` par défaut : sur ce blog, compter le code comme de la prose gonfle le
 * total d'environ 64 % et produit des chiffres qui ne veulent rien dire —
 * l'article `use-reducer` annonçait 16 min pour 5 min de texte réel. Le code se
 * parcourt, il ne se lit pas au rythme de la prose.
 *
 * Passer à `true` pour le comportement littéral de la recette Astro, qui compte
 * tout ce que contient la page.
 */
const COUNT_CODE = false;

/** Clé de l'accumulateur dans le sac de données du document. */
const BUFFER = "__readingTimeText";

type Bag = Record<string, unknown> & {
  astro?: { frontmatter: Record<string, unknown> };
};

function buffer(data: unknown): string[] {
  const bag = data as Bag;
  if (!Array.isArray(bag[BUFFER])) bag[BUFFER] = [];
  return bag[BUFFER] as string[];
}

export const mdastReadingTimePlugin = defineMdastPlugin({
  name: "mdast-reading-time",

  // Le sac de données est propre à chaque document, mais la définition du
  // plugin est partagée : on repart donc d'un accumulateur vide par document.
  before(_root, context) {
    (context.data as Bag)[BUFFER] = [];
  },

  // En mdast, `code` et `inlineCode` sont des littéraux : ils portent un
  // `.value` et n'ont aucun enfant `text`. Collecter les nœuds `text` exclut
  // donc le code sans avoir à toucher à l'arbre — aucune mutation, aucun risque
  // de faire disparaître un bloc de code du rendu.
  text(node, context) {
    buffer(context.data).push(node.value);
  },

  ...(COUNT_CODE
    ? {
        code(node: { value?: string }, context: { data: unknown }) {
          buffer(context.data).push(node.value ?? "");
        },
        inlineCode(node: { value?: string }, context: { data: unknown }) {
          buffer(context.data).push(node.value ?? "");
        },
      }
    : {}),

  after(_root, context) {
    const bag = context.data as Bag;
    const stats = getReadingTime(buffer(bag).join(" "));

    if (bag.astro !== undefined) {
      // `stats.text` donne directement « 5 min read ».
      bag.astro.frontmatter.minutesRead = stats.text;
      bag.astro.frontmatter.wordCount = stats.words;
    }

    delete bag[BUFFER];
  },
});

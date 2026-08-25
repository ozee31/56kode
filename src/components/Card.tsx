import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import SignalBars from "./SignalBars";
import Tags from "./Tags";
import type { PostData } from "../types";

/**
 * Carte unifiée — remplace l'ancien doublon Card.tsx / AiRadarCard.tsx, qui
 * partageaient la même structure et ne divergeaient que par la taille du titre,
 * le badge Featured et la note.
 *
 * Deux axes indépendants :
 *  - `variant` : la place occupée (featured pleine largeur / ligne de liste / rail)
 *  - `tone`    : le canvas sur lequel elle est posée (site phosphore / AI bleu froid)
 *
 * Reste en React : Search.tsx l'hydrate en `client:load`.
 */
export interface Props {
  href?: string;
  frontmatter: PostData;
  variant?: "featured" | "list" | "compact";
  tone?: "site" | "ai";
  /** Niveau du titre. `2` par défaut ; `1` pour le featured d'une page. */
  headingLevel?: 1 | 2 | 3;
  /** Libellé déjà formaté, ex. « 7 min read ». */
  readingTime?: string;
  /** Hôte de la source, pour les entrées AI Radar. */
  source?: string;
  /** Libellé de l'action en pied de colonne droite. */
  action?: string;
  showTags?: boolean;
  displayAuthor?: boolean;
}

const TONES = {
  site: {
    title: "text-fg-heading",
    body: "text-fg-secondary",
    lead: "text-fg-body",
    rule: "border-line-subtle",
    action: "text-accent",
    underline: "group-hover:decoration-accent",
  },
  ai: {
    title: "text-ai-fg",
    body: "text-ai-body",
    lead: "text-ai-body",
    rule: "border-line-ai",
    action: "text-ai-accent",
    underline: "group-hover:decoration-ai-accent",
  },
} as const;

export default function Card({
  href,
  frontmatter,
  variant = "list",
  tone = "site",
  headingLevel = 2,
  readingTime,
  source,
  action,
  showTags = false,
  displayAuthor = false,
}: Props) {
  const { title, pubDatetime, description, tags, author } = frontmatter;

  // Champs propres à certains schemas seulement : le composant sert les trois
  // collections (blog, aiRadar, techwatch), qui n'ont pas les mêmes clés.
  const modDatetime =
    "modDatetime" in frontmatter ? frontmatter.modDatetime : undefined;
  const rating = "rating" in frontmatter ? frontmatter.rating : undefined;
  // Le badge ne suit PAS la variante : `variant="featured"` décide de la place
  // dans la grille, le badge ne parle que de la donnée. Sans ça, l'article de
  // tête porterait « FEATURED » même quand aucun post n'est marqué.
  const isFlaggedFeatured =
    "featured" in frontmatter && frontmatter.featured === true;

  const t = TONES[tone];
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";
  const Heading = `h${headingLevel}` as "h1" | "h2" | "h3";

  const titleClass = isFeatured
    ? `font-reading text-display font-semibold ${t.title} max-w-[24ch] text-pretty`
    : isCompact
      ? `font-reading text-subheading font-semibold ${t.title} text-pretty`
      : `font-reading text-heading font-semibold ${t.title} max-w-[34ch] text-pretty`;

  const meta = (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
      {isFlaggedFeatured && (
        <span className="bg-accent-wash font-chrome text-meta tracking-chrome text-accent px-2 py-0.5">
          FEATURED
        </span>
      )}
      <Datetime
        pubDatetime={pubDatetime}
        modDatetime={modDatetime}
        tone={tone}
      />
      {source && (
        <span className="font-chrome text-micro tracking-chrome text-ai-muted uppercase">
          · {source}
        </span>
      )}
      {readingTime && (
        <span
          className={`font-chrome text-meta tracking-chrome uppercase ${tone === "ai" ? "text-ai-muted" : "text-fg-muted"}`}
        >
          · {readingTime}
        </span>
      )}
      {displayAuthor && author && author.length > 0 && (
        <span
          className={`font-chrome text-meta tracking-chrome ${tone === "ai" ? "text-ai-muted" : "text-fg-muted"}`}
        >
          · {author}
        </span>
      )}
    </div>
  );

  const body = (
    <>
      <div className={isFeatured ? "mb-4" : "mb-2.5"}>{meta}</div>
      <Heading
        style={{ viewTransitionName: slugifyStr(title) }}
        className={`${titleClass} ${isFeatured ? "mb-4" : "mb-2.5"} decoration-1 underline-offset-4 group-hover:underline ${t.underline}`}
      >
        {title}
      </Heading>
      <p
        className={
          isFeatured
            ? `max-w-measure font-reading text-lead ${t.lead} text-pretty`
            : isCompact
              ? `font-reading text-body-sm ${t.body} text-pretty`
              : `max-w-measure font-reading text-body ${t.body} text-pretty`
        }
      >
        {description}
      </p>
      {showTags && tags?.length > 0 && <Tags tags={tags} className="mt-4" />}
    </>
  );

  // Colonne de droite : temps de lecture ou note, plus l'action. Absente en
  // featured (le titre occupe toute la largeur) et en compact (rail étroit).
  const aside =
    !isFeatured && !isCompact && (rating !== undefined || action) ? (
      <div className="flex shrink-0 flex-col items-end justify-between gap-3 sm:w-[132px]">
        {rating !== undefined && (
          <SignalBars value={rating} variant="ai" size="sm" showValue />
        )}
        {action && (
          <span
            className={`font-chrome text-meta tracking-chrome uppercase ${t.action}`}
          >
            {action}
          </span>
        )}
      </div>
    ) : null;

  const inner = aside ? (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:justify-between sm:gap-8">
      <div className="min-w-0 flex-1">{body}</div>
      {aside}
    </div>
  ) : (
    body
  );

  const padding = isFeatured
    ? "px-(--page-gutter) py-10"
    : isCompact
      ? "px-6 py-4.5" // rail : gutter propre, plus étroit que la page
      : "px-(--page-gutter) py-6";

  return (
    <li
      className={
        isFeatured
          ? "border-line from-feature to-canvas border-b bg-gradient-to-b"
          : `border-b ${t.rule}`
      }
    >
      <a href={href} className={`focus-outline group block ${padding}`}>
        {inner}
      </a>
    </li>
  );
}

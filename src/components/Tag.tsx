/**
 * Badge de tag — source unique.
 *
 * Remplace le doublon Tag.astro / Tags.tsx, qui portaient mot pour mot la même
 * chaîne de classes dans deux implémentations à maintenir en parallèle.
 * Écrit en React pour rester utilisable depuis Card.tsx (hydraté par Search.tsx
 * en `client:load`) comme depuis les fichiers `.astro`, qui le rendent côté
 * serveur sans directive client.
 *
 * Rectangle contouré, mono minuscule, zéro arrondi. La variante `active` est un
 * aplat phosphore ; la variante `count` sert l'index des ~180 tags.
 */
export interface TagProps {
  tag: string;
  size?: "sm" | "lg";
  /** Aplat accent : page de tag courante. */
  active?: boolean;
  /** Nombre d'articles, affiché à droite du libellé (index des tags). */
  count?: number;
  className?: string;
}

export default function Tag({
  tag,
  size = "sm",
  active = false,
  count,
  className = "",
}: TagProps) {
  return (
    <a
      href={`/tags/${tag}/`}
      className={[
        "focus-outline inline-flex items-center gap-2 border font-chrome lowercase transition-colors",
        size === "sm" ? "px-2 py-0.5 text-meta" : "px-2.5 py-1 text-ui",
        active
          ? "border-accent bg-accent text-on-accent"
          : "border-line-strong text-fg-secondary hover:border-accent hover:text-accent",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {tag}
      {count !== undefined && (
        <span className={active ? "opacity-70" : "text-fg-muted"}>{count}</span>
      )}
    </a>
  );
}

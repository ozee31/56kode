import Tag from "./Tag";

export interface Props {
  tags: string[];
  size?: "sm" | "lg";
  /** Tag actuellement filtré, rendu en aplat accent. */
  activeTag?: string;
  className?: string;
}

/** Liste de badges. Toute la présentation vit dans `Tag` — ce composant ne fait que la grille. */
export default function Tags({
  tags,
  size = "sm",
  activeTag,
  className = "",
}: Props) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`.trim()}>
      {tags.map(tag => (
        <li key={tag}>
          <Tag tag={tag} size={size} active={tag === activeTag} />
        </li>
      ))}
    </ul>
  );
}

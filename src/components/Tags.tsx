export interface Props {
  tags: string[];
  size?: "sm" | "lg";
}

export default function Tags({ tags, size = "sm" }: Props) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <li key={tag} className="inline-block">
          <a
            href={`/tags/${tag}/`}
            className={`${
              size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm"
            } inline-block rounded-full border border-border bg-card/40 transition-colors hover:border-accent/40 hover:bg-accent/15 hover:text-accent focus-visible:p-1`}
          >
            {tag}
          </a>
        </li>
      ))}
    </ul>
  );
}

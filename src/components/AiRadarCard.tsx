import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";
import Tags from "./Tags";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"aiRadar">["data"];
  secHeading?: boolean;
}

function Rating({ rating }: { rating: number }) {
  return (
    <span className="text-sm" title={`${rating}/5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < rating ? "text-skin-accent" : "opacity-40"}
        >
          {i < rating ? "★" : "☆"}
        </span>
      ))}
    </span>
  );
}

export default function AiRadarCard({
  href,
  frontmatter,
  secHeading = true,
}: Props) {
  const { title, pubDatetime, description, tags, author, rating } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <li className="my-6">
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
      </a>
      <div className="flex items-center gap-3">
        <Datetime pubDatetime={pubDatetime} modDatetime={pubDatetime} />
        {author && author.length > 0 && (
          <span className="text-sm opacity-80">({author})</span>
        )}
        <Rating rating={rating} />
      </div>
      <p>{description}</p>
      <Tags tags={tags} />
    </li>
  );
}

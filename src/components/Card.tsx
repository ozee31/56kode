import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { PostData } from "../types";
import Tags from "./Tags";

export interface Props {
  href?: string;
  frontmatter: PostData;
  secHeading?: boolean;
  displayAuthor?: boolean;
}

export default function Card({
  href,
  frontmatter,
  secHeading = true,
  displayAuthor = false,
}: Props) {
  const { title, pubDatetime, description, tags, author } = frontmatter;
  // Blog-only fields: absent from the techwatch and ai-radar schemas.
  const modDatetime =
    "modDatetime" in frontmatter ? frontmatter.modDatetime : undefined;
  const featured = "featured" in frontmatter ? frontmatter.featured : undefined;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-xl font-medium decoration-dashed hover:underline",
  };

  return (
    <li className="my-6">
      <div className="flex items-center gap-2">
        <a
          href={href}
          className="inline-block text-xl font-medium text-accent decoration-dashed underline-offset-4 transition-colors hover:text-accent focus-visible:no-underline focus-visible:underline-offset-0"
        >
          {secHeading ? (
            <h2 {...headerProps}>{title}</h2>
          ) : (
            <h3 {...headerProps}>{title}</h3>
          )}
        </a>
        {featured && (
          <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs text-accent">
            Featured
          </span>
        )}
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-3">
        <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
        {displayAuthor && author && author.length > 0 && (
          <span className="text-sm opacity-80">({author})</span>
        )}
      </div>
      <p className="mt-1">{description}</p>
      <Tags tags={tags} />
    </li>
  );
}

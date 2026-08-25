import type socialIcons from "@assets/socialIcons";
import type { CollectionEntry } from "astro:content";

/** Collections that feed a post listing. */
export type PostCollection = "blog" | "techwatch" | "aiRadar";

/** An entry from any listable collection. */
export type PostEntry = CollectionEntry<PostCollection>;

/**
 * Frontmatter common to every listable entry. Only `title`, `description`,
 * `author`, `pubDatetime` and `tags` exist across all three schemas; anything
 * else (`draft`, `modDatetime`, `featured`, `url`, `slug`, ...) belongs to a
 * single collection and needs narrowing before use.
 */
export type PostData = PostEntry["data"];

export type Site = {
  website: string;
  author: string;
  profile: string;
  desc: string;
  title: string;
  titleShort: string;
  ogImage?: string;
  postPerIndex: number;
  postPerPage: number;
  scheduledPostMargin: number;
};

export type SocialObjects = {
  name: keyof typeof socialIcons;
  href: string;
  active: boolean;
  linkTitle: string;
}[];

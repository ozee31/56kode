import type { CollectionEntry } from "astro:content";
import getSortedPosts from "./getSortedPosts";
import { slugifyAll } from "./slugify";

const getPostsByTag = (
  posts: CollectionEntry<"blog" | "techwatch">[],
  tag: string
): CollectionEntry<"blog" | "techwatch">[] =>
  getSortedPosts(
    posts.filter(post => slugifyAll(post.data.tags).includes(tag))
  );

export default getPostsByTag;

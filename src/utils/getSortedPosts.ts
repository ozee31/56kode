import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

const getSortedPosts = (posts: CollectionEntry<"blog" | "techwatch">[]) => {
  return posts
    .filter(postFilter)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(
            (b.data as any).modDatetime ?? b.data.pubDatetime
          ).getTime() / 1000
        ) -
        Math.floor(
          new Date(
            (a.data as any).modDatetime ?? a.data.pubDatetime
          ).getTime() / 1000
        )
    );
};

export default getSortedPosts;

import type { PostEntry } from "../types";
import postFilter from "./postFilter";

/** `modDatetime` only exists on the blog schema, hence the narrowing. */
const sortDate = ({ data }: PostEntry) => {
  const date =
    "modDatetime" in data && data.modDatetime
      ? data.modDatetime
      : data.pubDatetime;
  return Math.floor(new Date(date).getTime() / 1000);
};

/**
 * Generic so the caller keeps its own collection type: passing
 * `CollectionEntry<"blog">[]` gives back `CollectionEntry<"blog">[]`, not the
 * widened union, which is what lets callers read collection-specific fields.
 */
const getSortedPosts = <T extends PostEntry>(posts: T[]): T[] =>
  posts.filter(postFilter).sort((a, b) => sortDate(b) - sortDate(a));

export default getSortedPosts;

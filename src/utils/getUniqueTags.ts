import { slugifyStr } from "./slugify";
import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";
import uniqBy from "lodash.uniqby";

interface Tag {
  tag: string;
  tagName: string;
}

const getUniqueTags = (posts: CollectionEntry<"blog" | "techwatch">[]) => {
  const tags: Tag[] = posts
    .filter(postFilter)
    .flatMap(post => post.data.tags)
    .map(tag => ({ tag: slugifyStr(tag), tagName: tag }))
    .filter(
      (value, index, self) =>
        self.findIndex(tag => tag.tag === value.tag) === index
    )
    .sort((tagA, tagB) => tagA.tag.localeCompare(tagB.tag));
  return tags;
};

export const getUniqueTagsForAllPosts = (
  blogPosts: CollectionEntry<"blog">[],
  techwatchPosts: CollectionEntry<"techwatch">[]
): Tag[] => {
  const postsTags = getUniqueTags(blogPosts);
  const techwatchTags = getUniqueTags(techwatchPosts);
  return mergeUniqueTags([...postsTags, ...techwatchTags]);
};

export const mergeUniqueTags = (tags: Tag[]): Tag[] => {
  return uniqBy(tags, "tag") as Tag[];
};

export default getUniqueTags;

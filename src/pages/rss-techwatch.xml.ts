import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import getSortedPosts from "@utils/getSortedPosts";
import { SITE } from "@config";

export async function GET() {
  const posts = await getCollection("techwatch");
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: `${SITE.title} - Tech Watch`,
    description: "All the articles I've selected",
    site: SITE.website,
    items: sortedPosts.map(({ data, id }) => ({
      link: (data as any).url || `posts/${id}/`,
      title: data.title,
      description: data.description,
      pubDate: new Date(data.pubDatetime),
    })),
  });
}

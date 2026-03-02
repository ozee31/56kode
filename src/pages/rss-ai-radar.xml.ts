import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import getSortedPosts from "@utils/getSortedPosts";
import { SITE } from "@config";

export async function GET() {
  const posts = await getCollection("aiRadar");
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: "56kode - AI Radar",
    description:
      "AI & agent development articles, rated and summarized.",
    site: SITE.website,
    items: sortedPosts.map(({ data, id }) => ({
      link: (data as any).url || `posts/${id}/`,
      title: data.title,
      description: data.description,
      pubDate: new Date(data.pubDatetime),
    })),
  });
}

import { SITE } from "@config";
import type { CollectionEntry } from "astro:content";

const postFilter = ({ data }: CollectionEntry<"blog" | "techwatch" | "aiRadar">) => {
  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;
  return !(data as any).draft && (import.meta.env.DEV || isPublishTimePassed);
};

export default postFilter;

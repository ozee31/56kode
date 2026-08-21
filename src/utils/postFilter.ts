import { SITE } from "@config";
import type { PostEntry } from "../types";

const postFilter = ({ data }: PostEntry) => {
  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;
  // `draft` only exists on the blog schema, hence the narrowing.
  const isDraft = "draft" in data && data.draft === true;
  return !isDraft && (import.meta.env.DEV || isPublishTimePassed);
};

export default postFilter;

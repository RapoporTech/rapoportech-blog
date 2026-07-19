import { getCollection } from "astro:content";

type Post = Awaited<ReturnType<typeof getCollection<"escritos">>>[number];

export function isPublished(post: Post) {
  return (
    !post.data.rascunho &&
    post.data.dataPub <= new Date()
  );
}

import { notFound } from "next/navigation";

import { TiptapServerRenderer } from "@/features/tiptap-editor";
import PostHeader from "@/features/tiptap-editor-demo/components/post-header";
import postService from "@/features/tiptap-editor-demo/services/post";

export default async function PostSsrPage() {
  const post = await postService.get();
  if (!post) return notFound();

  return (
    <article className="py-10 px-4 sm:px-6 flex flex-col items-center">
      <PostHeader
        title={post.title}
        author={post.author}
        createdAt={post.createdAt}
        readingTime={post.readingTime}
        cover={post.cover}
      />
      <div className="w-full lg:max-w-180">
        <TiptapServerRenderer>{post.html}</TiptapServerRenderer>
      </div>
    </article>
  );
}

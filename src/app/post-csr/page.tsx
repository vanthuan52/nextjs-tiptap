"use client";

import { TiptapClientRenderer } from "@/features/tiptap-editor";
import PostHeader from "@/features/tiptap-editor-demo/components/post-header";
import { usePost } from "@/features/tiptap-editor-demo/hooks/use-post";

export default function PostCsrPage() {
  const { post, isLoading } = usePost();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-400 animate-pulse">Loading post...</p>
      </div>
    );
  }

  if (!post) return null;

  return (
    <article className="py-10 px-6 flex flex-col items-center">
      <PostHeader
        title={post.title}
        author={post.author}
        createdAt={post.createdAt}
        readingTime={post.readingTime}
        cover={post.cover}
      />

      {/* Content rendered via TiptapClientRenderer */}
      <div className="w-full lg:max-w-180">
        <TiptapClientRenderer>{post.html}</TiptapClientRenderer>
      </div>
    </article>
  );
}

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setPosts } from "@/redux/features/slice/postsSlice";
import { setComments } from "@/redux/features/slice/commentsSlice";
import { mockPosts, mockComments } from "@/lib/mockData";
import { Navbar } from "@/components/common/Navbar";
import { CreatePost } from "@/components/feed/CreatePost";
import { PostCard } from "@/components/feed/PostCard";
import { LikeModal } from "@/components/common/LikeModal";
import { Empty } from "@/components/ui/empty";
import { useComments, usePosts } from "@/redux/hooks";

export default function FeedPageClient() {
  const router = useRouter();
  const { items: posts, dispatch: postsDispatch } = usePosts();
  const { dispatch: commentsDispatch } = useComments();

  useEffect(() => {
    postsDispatch(setPosts(mockPosts));
    commentsDispatch(setComments(mockComments));
  }, [router, postsDispatch, commentsDispatch]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="w-full max-w-2xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <CreatePost />
        {posts.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </main>
      <LikeModal />
    </div>
  );
}

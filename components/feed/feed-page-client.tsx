"use client";
import { Navbar } from "@/components/common/Navbar";
import { CreatePost } from "@/components/feed/CreatePost";
import { PostCard } from "@/components/feed/PostCard";
import { LikeModal } from "@/components/common/LikeModal";
import { Empty } from "@/components/ui/empty";
import { useFetchResourceQuery } from "@/redux/api/commonApi";
import { postRoutes } from "@/constants/end-point";
import { tagTypes } from "@/redux/tag-types";
import { Post } from "@/types";

export default function FeedPageClient() {
  const { data } = useFetchResourceQuery({
    url: postRoutes.feed,
    tags: [tagTypes.posts, tagTypes.comments],
  });

  const posts: Post[] = data?.data ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="w-full max-w-2xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <CreatePost />
        {posts?.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {posts?.map((post) => (
              <PostCard key={post._id} post={post} />
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

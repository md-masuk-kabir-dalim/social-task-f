"use client";
import { Comment, Post } from "@/types";
import { CommentForm } from "./CommentForm";
import { CommentItem } from "./CommentItem";
import { Empty } from "@/components/ui/empty";
import { useComments } from "@/redux/hooks";
import { useFetchResourceQuery } from "@/redux/api/commonApi";
import { commentRoutes } from "@/constants/end-point";
import { tagTypes } from "@/redux/tag-types";

interface CommentSectionProps {
  post: Post;
}

export function CommentSection({ post }: CommentSectionProps) {
  const { data } = useFetchResourceQuery({
    url: commentRoutes.getByPost(post._id),
    tags: [tagTypes.comments, tagTypes.posts],
  });

  const postComments: Comment[] = data?.data ?? [];

  return (
    <div className="bg-background border-t border-border">
      <CommentForm postId={post._id} />
      <div className="space-y-3 sm:space-y-4 p-3 sm:p-4">
        {postComments.length > 0 ? (
          postComments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
}

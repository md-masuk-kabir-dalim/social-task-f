"use client";
import { Post } from "@/types";
import { CommentForm } from "./CommentForm";
import { CommentItem } from "./CommentItem";
import { Empty } from "@/components/ui/empty";
import { useComments } from "@/redux/hooks";

interface CommentSectionProps {
  post: Post;
}

export function CommentSection({ post }: CommentSectionProps) {
  const { items: allComments } = useComments();
  const postComments = allComments.filter((c) => c.postId === post.id);

  return (
    <div className="bg-background border-t border-border">
      <CommentForm postId={post.id} />
      <div className="space-y-3 sm:space-y-4 p-3 sm:p-4">
        {postComments.length > 0 ? (
          postComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
}

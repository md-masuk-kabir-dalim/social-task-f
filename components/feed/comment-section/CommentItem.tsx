"use client";
import { Comment } from "@/types";
import { Button } from "@/components/ui/button";
import { FaReply } from "react-icons/fa";
import { ReplyItem } from "./ReplyItem";
import { useState } from "react";
import { ReplyForm } from "./ReplyForm";
import { CommentBox } from "@/components/shared/CommentBox";
import { LikeButton } from "@/components/shared/LikeButton";
import { Timestamp } from "@/components/shared/Timestamp";
import { useAuth } from "@/redux/hooks";
import { useCreateResourceMutation } from "@/redux/api/commonApi";
import { likeRoutes } from "@/constants/end-point";
import { tagTypes } from "@/redux/tag-types";
import { toast } from "sonner";

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  const { user: currentUser } = useAuth();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [createLike] = useCreateResourceMutation();
  const [isLiked, setIsLiked] = useState(
    currentUser
      ? comment.likes.some((like) => like.user === currentUser._id)
      : false,
  );
  const [likeCount, setLikeCount] = useState(comment.likes.length || 0);

  const handleLike = async () => {
    if (!currentUser) return;

    const payload = {
      commentId: comment._id,
      type: isLiked ? "dislike" : "like",
    };

    try {
      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));

      await createLike({
        url: likeRoutes.toggle,
        tags: [tagTypes.comments],
        payload,
      });
    } catch (error: any) {
      setIsLiked(isLiked);
      setLikeCount(likeCount);
      toast.error(error?.message || "Failed to like comment ❌");
    }
  };

  return (
    <div className="space-y-2 sm:space-y-3">
      <CommentBox
        user={comment.author}
        content={comment.content}
        timeAgo={<Timestamp date={new Date(comment.createdAt)} />}
      />

      <div className="flex items-center gap-2 sm:gap-4 px-2 sm:px-3">
        <LikeButton
          isLiked={isLiked}
          count={likeCount}
          onClick={handleLike}
          size="sm"
          showText={true}
        />
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs gap-1"
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          <FaReply className="w-3 h-3" />
          Reply
        </Button>
      </div>

      {showReplyForm && (
        <div className="ml-10 mb-3">
          <ReplyForm
            commentId={comment._id}
            onClose={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {comment.replies.length > 0 && (
        <div className="ml-10 space-y-3 pt-2 border-l-2 border-border pl-4">
          {comment.replies.map((reply) => (
            <ReplyItem key={reply._id} reply={reply} commentId={comment._id} />
          ))}
        </div>
      )}
    </div>
  );
}

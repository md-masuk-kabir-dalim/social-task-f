"use client";
import { Reply } from "@/types";
import { CommentBox } from "@/components/shared/CommentBox";
import { LikeButton } from "@/components/shared/LikeButton";
import { Timestamp } from "@/components/shared/Timestamp";
import { useAuth } from "@/redux/hooks";
import { likeRoutes } from "@/constants/end-point";
import { tagTypes } from "@/redux/tag-types";
import { toast } from "sonner";
import { useCreateResourceMutation } from "@/redux/api/commonApi";
import { useState } from "react";

interface ReplyItemProps {
  reply: Reply;
  commentId: string;
}

export function ReplyItem({ reply, commentId }: ReplyItemProps) {
  const { user: currentUser } = useAuth();
  const [createLike] = useCreateResourceMutation();
  const [isLiked, setIsLiked] = useState(
    currentUser
      ? reply.likes.some((like) => like.user.toString() === currentUser._id)
      : false,
  );
  const [likeCount, setLikeCount] = useState(reply.likes.length || 0);

  const handleLike = async () => {
    if (!currentUser) return;

    const payload = {
      replyId: reply._id,
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
      toast.error(error?.message || "Failed to like reply");
    }
  };

  return (
    <div className="space-y-1 sm:space-y-2">
      <CommentBox
        user={reply.author}
        content={reply.content}
        timeAgo={<Timestamp date={new Date(reply.createdAt)} />}
        compact={true}
      />
      <div className="px-2 sm:px-3">
        <LikeButton
          isLiked={isLiked}
          count={likeCount}
          onClick={handleLike}
          size="sm"
          showText={true}
        />
      </div>
    </div>
  );
}

"use client";
import { Reply } from "@/types";
import { likeReply } from "@/redux/features/slice/commentsSlice";
import { CommentBox } from "@/components/shared/CommentBox";
import { LikeButton } from "@/components/shared/LikeButton";
import { Timestamp } from "@/components/shared/Timestamp";
import { useAuth, useComments } from "@/redux/hooks";

interface ReplyItemProps {
  reply: Reply;
  commentId: string;
}

export function ReplyItem({ reply, commentId }: ReplyItemProps) {
  const { user: currentUser } = useAuth();
  const { dispatch } = useComments();

  const isLiked = true;
  const createdAt = new Date(reply.createdAt);

  const handleLike = () => {
    if (currentUser) {
      dispatch(
        likeReply({ commentId, replyId: reply.id, userId: currentUser._id }),
      );
    }
  };

  return (
    <div className="space-y-1 sm:space-y-2">
      <CommentBox
        user={reply.author}
        content={reply.content}
        timeAgo={<Timestamp date={createdAt} />}
        compact={true}
      />
      <div className="px-2 sm:px-3">
        <LikeButton
          isLiked={isLiked as boolean}
          count={0}
          onClick={handleLike}
          size="sm"
          showText={true}
        />
      </div>
    </div>
  );
}

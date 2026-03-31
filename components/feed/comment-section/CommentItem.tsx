"use client";

import { Comment } from "@/types";
import { useAuth, useComments } from "@/lib/hooks";
import { likeComment } from "@/lib/store/commentsSlice";
import { Button } from "@/components/ui/button";
import { FaReply } from "react-icons/fa";
import { ReplyItem } from "./ReplyItem";
import { useState } from "react";
import { ReplyForm } from "./ReplyForm";
import { CommentBox } from "@/components/shared/CommentBox";
import { LikeButton } from "@/components/shared/LikeButton";
import { Timestamp } from "@/components/shared/Timestamp";

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  const { user: currentUser } = useAuth();
  const { dispatch } = useComments();
  const [showReplyForm, setShowReplyForm] = useState(false);

  const isLiked = currentUser && comment.likes.includes(currentUser.id);
  const createdAt = new Date(comment.createdAt);

  const handleLike = () => {
    if (currentUser) {
      dispatch(likeComment({ commentId: comment.id, userId: currentUser.id }));
    }
  };

  return (
    <div className="space-y-2 sm:space-y-3">
      <CommentBox
        user={comment.user}
        content={comment.content}
        timeAgo={<Timestamp date={createdAt} />}
      />

      <div className="flex items-center gap-2 sm:gap-4 px-2 sm:px-3">
        <LikeButton
          isLiked={isLiked as boolean}
          count={comment.likes.length > 0 ? comment.likes.length : undefined}
          onClick={handleLike}
          size="sm"
          showText={comment.likes.length > 0}
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
            commentId={comment.id}
            onClose={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {comment.replies.length > 0 && (
        <div className="ml-10 space-y-3 pt-2 border-l-2 border-border pl-4">
          {comment.replies.map((reply) => (
            <ReplyItem key={reply.id} reply={reply} commentId={comment.id} />
          ))}
        </div>
      )}
    </div>
  );
}

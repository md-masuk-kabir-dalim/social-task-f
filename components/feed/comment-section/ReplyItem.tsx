'use client';

import { Reply } from '@/types';
import { useAuth, useComments } from '@/lib/hooks';
import { likeReply } from '@/lib/store/commentsSlice';
import { CommentBox } from '@/components/shared/CommentBox';
import { LikeButton } from '@/components/shared/LikeButton';
import { Timestamp } from '@/components/shared/Timestamp';

interface ReplyItemProps {
  reply: Reply;
  commentId: string;
}

export function ReplyItem({ reply, commentId }: ReplyItemProps) {
  const { user: currentUser } = useAuth();
  const { dispatch } = useComments();

  const isLiked = currentUser && reply.likes.includes(currentUser.id);
  const createdAt = new Date(reply.createdAt);

  const handleLike = () => {
    if (currentUser) {
      dispatch(likeReply({ commentId, replyId: reply.id, userId: currentUser.id }));
    }
  };

  return (
    <div className="space-y-1 sm:space-y-2">
      <CommentBox 
        user={reply.user} 
        content={reply.content}
        timeAgo={<Timestamp date={createdAt} />}
        compact={true}
      />
      <div className="px-2 sm:px-3">
        <LikeButton
          isLiked={isLiked}
          count={reply.likes.length > 0 ? reply.likes.length : undefined}
          onClick={handleLike}
          size="sm"
          showText={reply.likes.length > 0}
        />
      </div>
    </div>
  );
}

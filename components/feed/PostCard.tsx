"use client";
import { useState } from "react";
import { Post } from "@/types";
import { likePost } from "@/redux/features/slice/postsSlice";
import { openLikeModal } from "@/redux/features/slice/uiSlice";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CommentSection } from "./comment-section/CommentSection";
import { UserHeader } from "@/components/shared/UserHeader";
import { Content } from "@/components/shared/Content";
import { StatBar } from "@/components/shared/StatBar";
import { LikeButton } from "@/components/shared/LikeButton";
import { Timestamp } from "@/components/shared/Timestamp";
import { icons } from "@/constants/icons";
import { useAuth, usePosts, useUI } from "@/redux/hooks";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const { user: currentUser } = useAuth();
  const { dispatch: postsDispatch } = usePosts();
  const { dispatch: uiDispatch } = useUI();

  const isLiked = currentUser && post.likes.includes(currentUser.id);
  const createdAt = new Date(post.createdAt);

  const handleLike = () => {
    if (currentUser) {
      postsDispatch(likePost({ postId: post.id, userId: currentUser.id }));
    }
  };

  const handleOpenLikeModal = () => {
    uiDispatch(openLikeModal(post));
  };

  const handleShare = () => {
    const text = `Check out this post by ${post.user.name}: "${post.content.substring(0, 50)}..."`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <>
      <Card className="mb-4 sm:mb-6 rounded overflow-hidden border-border">
        <div className="p-3 sm:p-6">
          {/* Header */}
          <UserHeader
            user={post.user}
            timestamp={<Timestamp date={createdAt} />}
            action={
              <Button variant="ghost" size="sm">
                ⋯
              </Button>
            }
          />

          {/* Content */}
          <Content
            text={post.content}
            className="mb-3 sm:mb-4 whitespace-pre-wrap"
          />

          {/* Stats */}
          <StatBar
            stats={[
              {
                label: "likes",
                value: post.likes.length,
                onClick: handleOpenLikeModal,
                disabled: post.likes.length === 0,
              },
              {
                label: "comments",
                value: post.comments?.length || 0,
                onClick: () => setShowComments(!showComments),
              },
            ]}
            className="mb-3 sm:mb-4"
          />

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <LikeButton
              isLiked={isLiked as boolean}
              onClick={handleLike}
              size="md"
              showText={true}
            />
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 gap-1 sm:gap-2 h-8 sm:h-10 text-xs sm:text-sm"
              onClick={() => setShowComments(!showComments)}
            >
              <icons.CommentIcons className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Comment</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 gap-1 sm:gap-2 h-8 sm:h-10 text-xs sm:text-sm"
              onClick={handleShare}
            >
              <icons.ShareIcons className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && <CommentSection post={post} />}
      </Card>
    </>
  );
}

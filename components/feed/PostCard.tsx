"use client";
import { useState } from "react";
import { Post } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CommentSection } from "./comment-section/CommentSection";
import { UserHeader } from "@/components/shared/UserHeader";
import { Content } from "@/components/shared/Content";
import { StatBar } from "@/components/shared/StatBar";
import { LikeButton } from "@/components/shared/LikeButton";
import { Timestamp } from "@/components/shared/Timestamp";
import { icons } from "@/constants/icons";
import { useAuth, useUI } from "@/redux/hooks";
import { useCreateResourceMutation } from "@/redux/api/commonApi";
import { likeRoutes } from "@/constants/end-point";
import { tagTypes } from "@/redux/tag-types";
import { toast } from "sonner";
import { openLikeModal } from "@/redux/features/slice/uiSlice";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const { user: currentUser } = useAuth();
  const { dispatch: uiDispatch } = useUI();
  const [createLike] = useCreateResourceMutation();
  const [isLiked, setIsLiked] = useState(
    currentUser
      ? post.likes.some((like) => like.user === currentUser._id)
      : false,
  );
  const [likeCount, setLikeCount] = useState(post.likes.length);

  const createdAt = new Date(post.createdAt);

  const handleLike = async () => {
    if (!currentUser) return;

    const payload = {
      postId: post._id,
      type: isLiked ? "dislike" : "like",
    };

    try {
      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));

      await createLike({
        url: likeRoutes.toggle,
        tags: [tagTypes.posts],
        payload,
      });
    } catch (error: any) {
      setIsLiked(isLiked);
      setLikeCount(likeCount);
      toast.error(error?.message || "Failed to like post ❌");
    }
  };

  const handleOpenLikeModal = () => {
    uiDispatch(openLikeModal(post));
  };

  const handleShare = () => {
    const text = `Check out this post by ${post.author.fullName}: "${post.content.substring(
      0,
      50,
    )}..."`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <Card className="mb-4 sm:mb-6 rounded overflow-hidden border-border">
      <div className="p-3 sm:p-6">
        {/* Header */}
        <UserHeader
          user={post.author}
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
              value: likeCount,
              onClick: handleOpenLikeModal,
              disabled: false,
            },
            {
              label: "comments",
              value: post.commentsCount || 0,
              onClick: () => setShowComments(!showComments),
            },
          ]}
          className="mb-3 sm:mb-4"
        />

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <LikeButton
            isLiked={isLiked}
            count={likeCount}
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
  );
}

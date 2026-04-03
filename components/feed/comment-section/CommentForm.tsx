"use client";
import { addComment } from "@/redux/features/slice/commentsSlice";
import { Avatar } from "@/components/common/Avatar";
import { Button } from "@/components/ui/button";
import { useInput } from "@/hooks/useInput";
import { useAuth, useComments } from "@/redux/hooks";
import { useCreateResourceMutation } from "@/redux/api/commonApi";
import { commentRoutes } from "@/constants/end-point";
import { tagTypes } from "@/redux/tag-types";
import { toast } from "sonner";

interface CommentFormProps {
  postId: string;
}

export function CommentForm({ postId }: CommentFormProps) {
  const [createComment] = useCreateResourceMutation();
  const { user: currentUser } = useAuth();
  const contentInput = useInput({
    maxLength: 500,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contentInput.value.trim() || !currentUser) return;

    try {
      const newComment = {
        post: postId,
        author: currentUser?._id,
        content: contentInput.value,
      };

      await createComment({
        url: commentRoutes.create,
        tags: [tagTypes.comments],
        payload: newComment,
      }).unwrap();

      contentInput.reset();
      toast.success("Comment added successfully!");
    } catch (error: any) {
      toast.error(error?.message || "Failed to create comment");
    }
  };

  if (!currentUser) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 sm:gap-3 p-2 sm:p-4 border-t border-border"
    >
      <div className="hidden sm:block">
        <Avatar user={currentUser} size="md" />
      </div>
      <div className="sm:hidden">
        <Avatar user={currentUser} size="sm" />
      </div>
      <div className="flex-1 flex gap-1 sm:gap-2 min-w-0">
        <input
          type="text"
          placeholder="Comment..."
          value={contentInput.value}
          onChange={contentInput.handleChange}
          maxLength={500}
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground"
        />
        <Button
          type="submit"
          size="sm"
          disabled={!contentInput.value.trim()}
          className="bg-primary hover:bg-primary/90 text-xs sm:text-sm px-2 sm:px-4 h-8 sm:h-9"
        >
          <span className="hidden sm:inline">Post</span>
          <span className="sm:hidden">✓</span>
        </Button>
      </div>
    </form>
  );
}

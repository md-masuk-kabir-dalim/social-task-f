"use client";
import { useAuth, useComments, useInput } from "@/lib/hooks";
import { addComment } from "@/lib/store/commentsSlice";
import { Avatar } from "@/components/common/Avatar";
import { Button } from "@/components/ui/button";

interface CommentFormProps {
  postId: string;
}

export function CommentForm({ postId }: CommentFormProps) {
  const contentInput = useInput({
    maxLength: 500,
  });

  const { user: currentUser } = useAuth();
  const { dispatch } = useComments();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contentInput.value.trim() || !currentUser) return;

    const newComment = {
      id: Math.random().toString(36).substr(2, 9),
      postId,
      userId: currentUser.id,
      user: currentUser,
      content: contentInput.value,
      likes: [],
      replies: [],
      createdAt: new Date().toISOString(),
    };

    dispatch(addComment(newComment));
    contentInput.reset();
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

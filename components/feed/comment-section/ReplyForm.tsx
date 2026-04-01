"use client";
import { useState } from "react";
import { addReply } from "@/redux/features/slice/commentsSlice";
import { Avatar } from "@/components/common/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, useComments } from "@/redux/hooks";

interface ReplyFormProps {
  commentId: string;
  onClose: () => void;
}

export function ReplyForm({ commentId, onClose }: ReplyFormProps) {
  const [content, setContent] = useState("");
  const { user: currentUser } = useAuth();
  const { dispatch } = useComments();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !currentUser) return;

    const newReply = {
      id: Math.random().toString(36).substr(2, 9),
      commentId,
      userId: currentUser.id,
      user: currentUser,
      content,
      likes: [],
      createdAt: new Date().toISOString(),
    };

    dispatch(addReply({ commentId, reply: newReply }));
    setContent("");
    onClose();
  };

  if (!currentUser) return null;

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Avatar user={currentUser} size="sm" />
      <div className="flex-1 flex gap-2">
        <Input
          placeholder="Write a reply..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-sm"
        />
        <Button
          type="submit"
          size="sm"
          disabled={!content.trim()}
          className="bg-primary hover:bg-primary/90"
        >
          Reply
        </Button>
      </div>
    </form>
  );
}

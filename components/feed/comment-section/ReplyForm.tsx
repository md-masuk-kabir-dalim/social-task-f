"use client";
import { useState } from "react";
import { addReply } from "@/redux/features/slice/commentsSlice";
import { Avatar } from "@/components/common/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, useComments } from "@/redux/hooks";
import { useCreateResourceMutation } from "@/redux/api/commonApi";
import { replyRoutes } from "@/constants/end-point";
import { tagTypes } from "@/redux/tag-types";
import { toast } from "sonner";

interface ReplyFormProps {
  commentId: string;
  onClose: () => void;
}

export function ReplyForm({ commentId, onClose }: ReplyFormProps) {
  const [content, setContent] = useState("");
  const { user: currentUser } = useAuth();
  const [createReply] = useCreateResourceMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() || !currentUser) return;

    const newReply = {
      commentId,
      userId: currentUser._id,
      content,
    };

    try {
      await createReply({
        url: replyRoutes.create,
        tags: [tagTypes.comments],
        payload: newReply,
      }).unwrap();

      toast.success("Reply added successfully! ✅");
      setContent("");
      onClose();
    } catch (error: any) {
      toast.error(error?.message || "Failed to add reply ❌");
    }
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

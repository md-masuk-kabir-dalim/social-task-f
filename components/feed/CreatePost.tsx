"use client";
import { useState, useRef, useEffect } from "react";
import { addPost } from "@/redux/features/slice/postsSlice";
import { Avatar } from "@/components/common/Avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormTextarea } from "@/components/shared";
import { FiImage } from "react-icons/fi";
import { FaRegSmile } from "react-icons/fa";
import dynamic from "next/dynamic";
import { useInput } from "@/hooks/useInput";
import { useAuth, usePosts } from "@/redux/hooks";
import Loading from "../shared/Loading";
import { useCreateResourceMutation } from "@/redux/api/commonApi";
import { postRoutes } from "@/constants/end-point";
import { tagTypes } from "@/redux/tag-types";
import { useUploadFile } from "@/hooks/useUploadFile.ts";
import { toast } from "sonner";
const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

export function CreatePost() {
  const contentInput = useInput({ maxLength: 1000 });
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { user: currentUser, isAuthLoading } = useAuth();
  const { uploadFile } = useUploadFile();
  const [createPost] = useCreateResourceMutation();
  const emojiRef = useRef<HTMLDivElement>(null);

  // Close emoji picker on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showEmojiPicker]);

  if (!currentUser) return null;

  const handleImageRemove = async () => {
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contentInput.value.trim()) return;
    let image;
    try {
      setLoading(true);
      if (imageFile) {
        image = await uploadFile(imageFile as File);
      }

      const postPayload = {
        content: contentInput.value.trim(),
        ...(image && {
          image: {
            url: image?.secure_url,
            altText: "post image",
            publicId: image?.public_id,
          },
        }),
      };

      await createPost({
        url: postRoutes.create,
        payload: postPayload,
        tags: [tagTypes.posts],
      }).unwrap();

      contentInput.reset();
      setImageFile(null);
      setShowEmojiPicker(false);
    } catch (error: any) {
      toast.error("Post creation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmojiClick = (emojiData: any) => {
    contentInput.setValue(contentInput.value + emojiData.emoji);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  if (isAuthLoading) return <Loading />;

  return (
    <Card className="p-4 sm:p-6 mb-4 sm:mb-6 border-border rounded">
      <div className="flex gap-3 sm:gap-4">
        <div className="hidden sm:block">
          <Avatar user={currentUser} size="lg" />
        </div>
        <div className="sm:hidden">
          <Avatar user={currentUser} size="md" />
        </div>

        <div className="flex-1 min-w-0">
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <FormTextarea
              placeholder="What's on your mind?"
              value={contentInput.value}
              onChange={contentInput.handleChange}
              onBlur={contentInput.handleBlur}
              maxLength={1000}
              minHeight="min-h-20 sm:min-h-24"
              rows={3}
              className="resize-none rounded-md border border-border focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors"
            />

            {imageFile && (
              <div className="relative w-full sm:max-w-md h-32 sm:h-48 rounded-md overflow-hidden">
                <img
                  src={URL.createObjectURL(imageFile!)}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={handleImageRemove}
                  className="absolute top-1 right-1 bg-destructive/80 hover:bg-destructive text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>
            )}

            {showEmojiPicker && (
              <div ref={emojiRef} className="absolute z-50 mt-2">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}

            <p className="text-xs text-muted-foreground text-right">
              {contentInput.value.length}/1000
            </p>

            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-1 sm:gap-2 relative">
                <label
                  htmlFor="file-upload"
                  className="flex items-center gap-1 sm:gap-2 h-8 sm:h-9 text-xs sm:text-sm hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <FiImage className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Photo</span>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="gap-1 sm:gap-2 h-8 sm:h-9 text-xs sm:text-sm hover:bg-muted/50 transition-colors"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <FaRegSmile className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Emoji</span>
                </Button>
              </div>

              <Button
                type="submit"
                disabled={!contentInput.value.trim() || loading}
                size="sm"
                className={`h-8 sm:h-9 text-xs sm:text-sm ${
                  !contentInput.value.trim() || loading
                    ? "bg-primary/60 cursor-not-allowed"
                    : "bg-primary hover:bg-primary/90"
                } transition-colors`}
              >
                {loading ? "Posting..." : "Post"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Card>
  );
}

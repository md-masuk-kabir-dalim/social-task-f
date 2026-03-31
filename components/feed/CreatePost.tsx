'use client';

import { useState } from 'react';
import { useAuth, usePosts, useInput } from '@/lib/hooks';
import { addPost } from '@/lib/store/postsSlice';
import { Avatar } from '@/components/common/Avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FormTextarea } from '@/components/shared';
import { FaImage } from 'react-icons/fa';

export function CreatePost() {
  const contentInput = useInput({
    maxLength: 1000,
  });

  const [loading, setLoading] = useState(false);
  const { user: currentUser } = useAuth();
  const { dispatch } = usePosts();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contentInput.value.trim() || !currentUser) return;

    setLoading(true);

    const newPost = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      user: currentUser,
      content: contentInput.value,
      likes: [],
      comments: [],
      createdAt: new Date().toISOString(),
    };

    dispatch(addPost(newPost));
    contentInput.reset();
    setLoading(false);
  };

  if (!currentUser) return null;

  return (
    <Card className="p-3 sm:p-6 mb-4 sm:mb-6 border-border">
      <div className="flex gap-2 sm:gap-4">
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
            />
            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-1 sm:gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="gap-1 sm:gap-2 h-8 sm:h-9 text-xs sm:text-sm"
                >
                  <FaImage className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Photo</span>
                </Button>
              </div>
              <Button
                type="submit"
                disabled={!contentInput.value.trim() || loading}
                size="sm"
                className="bg-primary hover:bg-primary/90 text-xs sm:text-sm h-8 sm:h-9"
              >
                {loading ? 'Posting...' : 'Post'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Card>
  );
}

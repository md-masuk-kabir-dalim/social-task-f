'use client';

import { useUI } from '@/lib/hooks';
import { closeLikeModal } from '@/lib/store/uiSlice';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { mockUsers } from '@/lib/mockData';
import { Avatar } from './Avatar';

export function LikeModal() {
  const { likeModalOpen, likeModalPost, dispatch } = useUI();

  if (!likeModalPost) return null;

  const likedUsers = mockUsers.filter(user => likeModalPost.likes.includes(user.id));

  const handleClose = () => {
    dispatch(closeLikeModal());
  };

  return (
    <Dialog open={likeModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Liked by ({likeModalPost.likes.length})</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {likedUsers.length > 0 ? (
            likedUsers.map(user => (
              <div key={user.id} className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Avatar user={user} size="sm" />
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">No likes yet</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

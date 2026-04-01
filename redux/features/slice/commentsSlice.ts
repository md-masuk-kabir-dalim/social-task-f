import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentsState, Comment, Reply } from '@/types';

const initialState: CommentsState = {
  items: [],
  loading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    updateComment: (state, action: PayloadAction<Comment>) => {
      const index = state.items.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    likeComment: (state, action: PayloadAction<{ commentId: string; userId: string }>) => {
      const comment = state.items.find(c => c.id === action.payload.commentId);
      if (comment) {
        const index = comment.likes.indexOf(action.payload.userId);
        if (index === -1) {
          comment.likes.push(action.payload.userId);
        } else {
          comment.likes.splice(index, 1);
        }
      }
    },
    addReply: (state, action: PayloadAction<{ commentId: string; reply: Reply }>) => {
      const comment = state.items.find(c => c.id === action.payload.commentId);
      if (comment) {
        comment.replies.push(action.payload.reply);
      }
    },
    likeReply: (state, action: PayloadAction<{ commentId: string; replyId: string; userId: string }>) => {
      const comment = state.items.find(c => c.id === action.payload.commentId);
      if (comment) {
        const reply = comment.replies.find(r => r.id === action.payload.replyId);
        if (reply) {
          const index = reply.likes.indexOf(action.payload.userId);
          if (index === -1) {
            reply.likes.push(action.payload.userId);
          } else {
            reply.likes.splice(index, 1);
          }
        }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setComments, addComment, updateComment, likeComment, addReply, likeReply, setLoading, setError } = commentsSlice.actions;
export default commentsSlice.reducer;

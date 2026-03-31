import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostsState, Post } from '@/types';

const initialState: PostsState = {
  items: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.items.unshift(action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    likePost: (state, action: PayloadAction<{ postId: string; userId: string }>) => {
      const post = state.items.find(p => p.id === action.payload.postId);
      if (post) {
        const index = post.likes.indexOf(action.payload.userId);
        if (index === -1) {
          post.likes.push(action.payload.userId);
        } else {
          post.likes.splice(index, 1);
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

export const { setPosts, addPost, updatePost, likePost, setLoading, setError } = postsSlice.actions;
export default postsSlice.reducer;

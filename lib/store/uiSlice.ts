import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState, Post } from '@/types';

const initialState: UIState = {
  selectedPost: null,
  likeModalOpen: false,
  likeModalPost: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    openLikeModal: (state, action: PayloadAction<Post>) => {
      state.likeModalOpen = true;
      state.likeModalPost = action.payload;
    },
    closeLikeModal: (state) => {
      state.likeModalOpen = false;
      state.likeModalPost = null;
    },
  },
});

export const { setSelectedPost, openLikeModal, closeLikeModal } = uiSlice.actions;
export default uiSlice.reducer;

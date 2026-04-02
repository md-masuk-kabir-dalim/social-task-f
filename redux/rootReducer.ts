import { baseApi } from "./api/baseApi";
import { alertReducer } from "./features/reducer/alertReducer";
import layoutReducer from "./features/slice/layoutSlice";
import authReducer from "./features/slice/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import postsReducer from "./features/slice/postsSlice";
import commentsReducer from "./features/slice/commentsSlice";
import uiReducer from "./features/slice/uiSlice";

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  alert: alertReducer,
  layout: layoutReducer,
  posts: postsReducer,
  comments: commentsReducer,
  ui: uiReducer,
});

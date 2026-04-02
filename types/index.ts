export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user: User;
  content: string;
  likes: string[];
  replies: Reply[];
  createdAt: string;
}

export interface Reply {
  id: string;
  commentId: string;
  userId: string;
  user: User;
  content: string;
  likes: string[];
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  content: string;
  image?: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

export interface PostsState {
  items: Post[];
  loading: boolean;
  error: string | null;
}

export interface CommentsState {
  items: Comment[];
  loading: boolean;
  error: string | null;
}

export interface UIState {
  selectedPost: Post | null;
  likeModalOpen: boolean;
  likeModalPost: Post | null;
}

export interface OtpTokenPayload {
  id: string;
  email: string;
  type: string;
  expiresAt: string;
  cooldownAt: string;
  exp: number;
}

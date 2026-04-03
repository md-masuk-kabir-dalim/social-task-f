import { useAppDispatch } from "@/redux/hooks";

export interface PostImage {
  url: string;
  publicId: string;
  altText?: string;
}

export interface Author {
  _id: string;
  fullName: string;
  image?: string;
}

export interface User {
  _id: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  phoneNo?: string;
  image?: string;
  role?: string;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Comment {
  _id: string;
  post: string;
  author: Author; 
  content: string;
  likes: {
    user:string;
    type: "like" | "dislike";
  }[];
  createdAt: string;
  replies: Reply[];
}

export interface Reply {
  _id: string;
  comment: string;
  author: Author; 
  content: string;
  likesCount: number;
  likes: {
    user:string;
    type: "like" | "dislike";
  }[];
  createdAt: string;
}

export interface Post {
  _id: string;       
  id: string;          
  author: Author;     
  content: string;
  image?: PostImage;
  likesCount: number;
  comments: Comment[];
  commentsCount: number;
  policy: "PUBLISH" | "PRIVATE";
  likes:{
    user:string;
    type: "like" | "dislike";
  }[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
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


export interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  dispatch: ReturnType<typeof useAppDispatch>;
};
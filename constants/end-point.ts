const rootRoutes = "/api/v1";
const rootAuthRoute = `${rootRoutes}/auth`;
const rootUserRoute = `${rootRoutes}/user`;
const rootImageRoute = `${rootRoutes}/image`;
const rootPostRoute = `${rootRoutes}/posts`;
const rootCommentRoute = `${rootRoutes}/comments`;
const rootReplyRoute = `${rootRoutes}/replies`;
const rootLikeRoute = `${rootRoutes}/likes`;

// ------------------------------
// AUTH ROUTES
// ------------------------------
export const authRoutes = {
  register: `${rootAuthRoute}/register`,
  login: `${rootAuthRoute}/login`,
  forgotPassword: `${rootAuthRoute}/forgot-password`,
  resetPassword: `${rootAuthRoute}/reset-password`,
  verifyOtp: `${rootAuthRoute}/otp/verify`,
  refreshToken: `${rootAuthRoute}/refresh-token`,
  getMyProfile: `${rootAuthRoute}/me`,
  changePassword: `${rootAuthRoute}/change-password`,
  sendOtp: `${rootAuthRoute}/otp/send`,
  logout: `${rootAuthRoute}/logout`,
};

// ------------------------------
// USER ROUTES
// ------------------------------
export const usersRoutes = {
  create: rootUserRoute,
  getAllUsers: rootUserRoute,
  getUserById: (id: string) => `${rootUserRoute}/${id}`,
  updateUser: `${rootUserRoute}/update-user`,
  deleteUser: (id: string) => `${rootUserRoute}/delete/${id}`,
};


// ------------------------------
// IMAGE ROUTES
// ------------------------------
export const imageRoutes = {
  upload: `${rootImageRoute}/upload`,   
  update: `${rootImageRoute}/update`,    
  delete: `${rootImageRoute}/delete`,  
};

// ------------------------------
// POST ROUTES
// ------------------------------
export const postRoutes = {
  create: rootPostRoute,               
  getById: (id: string) => `${rootPostRoute}/${id}`, 
  update: (id: string) => `${rootPostRoute}/${id}`, 
  delete: (id: string) => `${rootPostRoute}/${id}`,
  feed: `${rootPostRoute}/feed`,    
};

// ------------------------------
// COMMENT ROUTES
// ------------------------------
export const commentRoutes = {
  create: rootCommentRoute,             
  getById: (id: string) => `${rootCommentRoute}/${id}`, 
  update: (id: string) => `${rootCommentRoute}/${id}`,
  delete: (id: string) => `${rootCommentRoute}/${id}`,
  getByPost: (postId: string) => `${rootCommentRoute}/post/${postId}`, 
};

// ------------------------------
// REPLY ROUTES ADDED
// ------------------------------
export const replyRoutes = {
  create: `${rootReplyRoute}/create`,
  getById: (id: string) => `${rootReplyRoute}/${id}`,
  update: (id: string) => `${rootReplyRoute}/${id}`,
  delete: (id: string) => `${rootReplyRoute}/${id}`,
  getByComment: (commentId: string) =>
    `${rootReplyRoute}/comment/${commentId}`,
};

// ------------------------------
// LIKE ROUTES ADDED
// ------------------------------
export const likeRoutes = {
 toggle: rootLikeRoute,
};
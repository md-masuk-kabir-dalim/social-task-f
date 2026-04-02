const rootRoutes = "/api/v1";
const rootAuthRoute = `${rootRoutes}/auth`;
const rootUserRoute = `${rootRoutes}/user`;

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

export const apiKey = import.meta.env.VITE_REACT_APP_BASE_URL;
export const API = {
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    sendOtp: "/api/auth/send-otp",
    verifyOtp: "/api/auth/verify-otp",
    resetPassword: "/api/auth/reset-password",
  },
};

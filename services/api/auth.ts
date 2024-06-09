import { requests } from "./ApiServices";

export const Auth = {
  login: (data: any) => requests.post("/api/auth/login", data),
  //   signUp: (data: any) => requests.post("/api/auth/sign-up", data),
  //   verifyEmail: (token: any) =>
  //     requests.post(`/api/auth/email-verification?token=${token}`),
  // logout: () => requests.post("/api/auth/logout"),
};

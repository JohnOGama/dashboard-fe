import { requests } from "./ApiServices";

export const User = {
  getMe: () => requests.get("/api/users/me"),
  getAllUsers: () => requests.get("/api/users"),
};

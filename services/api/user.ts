import { Users } from "@/store/useUserStore";
import { requests } from "./ApiServices";

export const User = {
  getMe: () => requests.get("/api/users/me"),
  getAllUsers: () => requests.get("/api/admin/users"),
  updateUser: (data: Partial<Users>) =>
    requests.put(`/api/admin/users/${data._id}`, data),
  deleteUser: (id: any) => requests.delete(`/api/admin/users/${id}`),
  addUser: (data: Partial<Users>) => requests.post("/api/admin/users", data),
};

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { User } from "@/services/api/user";
import { AxiosError } from "axios";

export interface Users {
  _id: string;
  createdAt: string;
  email: string;
  firstName: string;
  isOnline: boolean;
  lastName: string;
  name: string;
  registrationType: string;
  role: string;
  status: string;
  updatedAt: string;
  username: string;
  verifiedEmail: boolean;
}

type Data = {
  data?: {
    count?: number;
    rows?: Users[];
  };
  statusCode?: number;
};

type RFState = {
  users: Data;
  loading: boolean;
  onError: boolean;
  errorMessage: string;

  fetchAllUsers: () => void;
  updateUser: (data: Partial<Users>) => void;
  deleteUser: (id: any) => void;
  addUser: (data: any) => void;
};

const useUserStore = create<RFState>()(
  devtools(
    (set, get) => ({
      users: [],
      loading: false,
      onError: false,
      errorMessage: "",
      fetchAllUsers: async () => {
        set({ loading: true, onError: false, errorMessage: "" });
        try {
          const response = await User.getAllUsers();
          set({
            users: response,
            loading: false,
            errorMessage: "",
            onError: false,
          });
        } catch (error) {
          set({
            loading: false,
            errorMessage: "Error fetching users",
            onError: true,
          });
        }
      },
      updateUser: async (data: Partial<Users>) => {
        if (!data._id) return;

        set({ loading: true });
        try {
          const response = await User.updateUser(data);
          console.log("res", response);
          if (response.statusCode === 200) {
            set({ loading: false, onError: false, errorMessage: "" });
          } else {
            set({
              loading: false,
              onError: true,
              errorMessage: response.data.message || "Error updating user",
            });
          }
        } catch (error) {
          set({ loading: false, onError: true });
          if (error instanceof AxiosError) {
            set({ errorMessage: error.message });
          }
        }
      },
      deleteUser: async (id: any) => {
        if (!id) return;

        const response = await User.deleteUser(id);

        if (response.statusCode === 200) {
          set({ loading: false, onError: false, errorMessage: "" });
        } else {
          set({
            loading: false,
            onError: true,
            errorMessage: response.data.message || "Error updating user",
          });
        }
      },
      addUser: async (data: any) => {
        set({ loading: true });
        const response = await User.addUser(data);

        if (response.statusCode === 200) {
          set({
            loading: false,
            onError: false,
            errorMessage: "",
          });
        } else {
          set({
            loading: false,
            onError: true,
            errorMessage: "Error adding User",
          });
        }
      },
    }),
    {
      name: "Users",
    }
  )
);

export default useUserStore;

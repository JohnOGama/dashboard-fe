import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { User } from "@/services/api/user";

interface Users {
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
};

const useUserStore = create<RFState>()(
  devtools(
    persist(
      (set, get) => ({
        users: [],
        loading: false,
        onError: false,
        errorMessage: "",
        fetchAllUsers: async () => {
          const users = await User.getAllUsers();
          set({ loading: true, onError: false, errorMessage: "" });
          try {
            const response = await User.getAllUsers();

            set({ users: response });
          } catch (error) {}
        },
      }),
      {
        name: "Users",
      }
    )
  )
);

export default useUserStore;

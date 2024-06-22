import { Auth, User } from "@/services/api";
import axios from "axios";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

type UserRole = "user" | "admin" | "moderator";

type RegistrationType = "self" | "admin" | "invite";

type UserStatus = "active" | "inactive" | "suspended";

export type UserDetails = {
  companies?: string[];
  createdAt?: string; // ISO date string
  email?: string;
  firstName?: string;
  isOnline?: boolean;
  lastName?: string;
  name?: string;
  registrationType?: RegistrationType;
  role?: UserRole;
  status?: UserStatus;
  updatedAt?: string;
  username?: string;
  verifiedEmail?: boolean;
};

type RFState = {
  user: UserDetails;
  token: string;
  errorMessage?: string;
  successMessage?: string;
  onError?: boolean;
  loading?: boolean;
  login: (email: string, password: string, remember: boolean) => void;
  register: (username: string, email: string, password: string) => void;
  logout: () => void;
};

const useAuthStore = create<RFState>()(
  devtools(
    persist(
      (set, get) => ({
        user: {},
        token: "",
        loading: false,
        login: async (
          username: string,
          password: string,
          remember: boolean
        ) => {
          set({ loading: true });
          const doLoginUser = await Auth.login({
            username,
            password,
            remember,
          });
          console.log("res", doLoginUser);
          if (doLoginUser.data.status && doLoginUser.data.isAdmin) {
            // Append token here to authenticate request
            // axios.defaults.headers.common.Authorization = `Bearer ${doLoginUser.data.token}`;
            const getUser = await User.getMe();

            set({
              errorMessage: "",
              onError: false,
              loading: false,
              token: doLoginUser.data.token,
              user: {
                ...getUser.data,
              },
            });
            return doLoginUser;
          } else {
            set({
              errorMessage:
                doLoginUser.data.message || "Invalid Password or Username",
              onError: true,
              loading: false,
            });
          }
        },
        register: (username: string, email: string, password: string) => {},
        logout: () => {
          set({ user: {}, loading: false, token: "" });
        },
      }),
      {
        name: "Auth",
      }
    )
  )
);

export default useAuthStore;

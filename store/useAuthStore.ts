import { baseUrl } from "@/const/const";
import axios, { AxiosResponse } from "axios";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export type UserDetails = {
  id?: string;
  username?: string;
  email?: string;
  token?: string;
};

type RFState = {
  user: UserDetails;

  login: (email: string, password: string, token: string) => void;
  register: (username: string, email: string, password: string) => void;
  logout: () => void;
};

const useAuthStore = create<RFState>()(
  devtools(
    persist(
      (set, get) => ({
        user: {},

        login: async (email: string, password: string, token: string) => {
          if (email && password) {
            set({ user: { email, token } });
          }
        },
        register: (username: string, email: string, password: string) => {},
        logout: () => {
          set({ user: {} });
        },
      }),
      {
        name: "Auth",
      }
    )
  )
);

export default useAuthStore;

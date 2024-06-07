import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import USERS from "@/MOCK_DATA/Users.json";

type Users = {
  id: any;
  name: string;
  email: string;
  createdAt: any;
  role: string;
};

type RFState = {
  users: Users[];
  isLoading: boolean;
  addUser: (newUser: Users) => void;
  fetchAllUsers: () => void;
  fetchSingleUser: (id: any) => void;
  deleteSingleUser: (id: any) => void;
  editUser: (id: any, editedUser: Partial<Users>) => void;
};

const useUserStore = create<RFState>()(
  devtools(
    persist(
      (set, get) => ({
        users: [],
        isLoading: false,
        addUser: (newUser) => {
          set((state) => ({
            users: [newUser, ...state.users],
          }));
        },
        fetchAllUsers: () => {
          try {
            set({ isLoading: true });
            set({ users: USERS });
          } catch (error) {
            set({ isLoading: false });
            console.log("error fetching all users", error);
          } finally {
            set({ isLoading: false });
          }
        },
        fetchSingleUser: (id) => {
          if (!id) return undefined;

          const user = get().users.find((user) => user.id === id);
          return user;
        },
        deleteSingleUser: (id) => {
          set((state) => ({
            users: state.users.filter((user) => user.id !== id),
          }));
        },
        editUser: (id, editedUser) => {
          if (!id) return;

          const updatedUsers = get().users.map((user) => {
            if (user.id === id) {
              return { ...user, ...editedUser };
            }
            return user;
          });

          set({ users: updatedUsers });
        },
      }),
      {
        name: "Users",
      }
    )
  )
);

export default useUserStore;

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import BOARDS from "@/MOCK_DATA/Boards.json";

type Board = {
  id: number;
  companyName: string;
  sales: number;
  revenue: number;
};

type RFState = {
  boards: Board[];
  addBoard: (newBoard: Board) => void;
  fetchAllBoards: () => void;
  fetchSingleBoard: (id: number) => Board | undefined;
  updateBoard: (id: number, updatedBoard: Partial<Board>) => void;
  deleteBoard: (id: number) => void;
};

const useBoardStore = create<RFState>()(
  devtools(
    persist(
      (set, get) => ({
        boards: [],
        addBoard: (newBoard) => {
          set((state) => ({
            boards: [...state.boards, newBoard],
          }));
        },
        fetchAllBoards: () => {
          set({ boards: BOARDS });
        },
        fetchSingleBoard: (id) => {
          return get().boards.find((board) => board.id === id);
        },
        updateBoard: (id, updatedBoard) => {
          set((state) => ({
            boards: state.boards.map((board) =>
              board.id === id ? { ...board, ...updatedBoard } : board
            ),
          }));
        },
        deleteBoard: (id) => {
          set((state) => ({
            boards: state.boards.filter((board) => board.id !== id),
          }));
        },
      }),
      {
        name: "boards-storage",
      }
    )
  )
);

export default useBoardStore;

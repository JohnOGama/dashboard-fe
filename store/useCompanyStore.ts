import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import COMPANY from "@/MOCK_DATA/Company.json";

type Company = {
  id: number;
  name: string;
  email: string;
  company_name: string;
  createdAt: string;
};

type RFState = {
  company: Company[];
  addCompany: (newCompany: Company) => void;
  fetchAllCompanies: () => void;
  fetchSingleCompany: (id: number) => Company | undefined;
  updateCompany: (id: number, updatedCompany: Partial<Company>) => void;
  deleteCompany: (id: number) => void;
};

const useCompanyStore = create<RFState>()(
  devtools(
    persist(
      (set, get) => ({
        company: [],
        addCompany: (newCompany) => {
          set((state) => ({
            company: [...state.company, newCompany],
          }));
        },
        fetchAllCompanies: () => {
          set({ company: COMPANY });
        },
        fetchSingleCompany: (id) => {
          return get().company.find((company) => company.id === id);
        },
        updateCompany: (id, updatedCompany) => {
          set((state) => ({
            company: state.company.map((company) =>
              company.id === id ? { ...company, ...updatedCompany } : company
            ),
          }));
        },
        deleteCompany: (id) => {
          set((state) => ({
            company: state.company.filter((company) => company.id !== id),
          }));
        },
      }),
      {
        name: "Company",
      }
    )
  )
);

export default useCompanyStore;

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import COMPANY from "@/MOCK_DATA/Company.json";
import { Companies } from "@/services/api";
import { count } from "console";
import { flightRouterStateSchema } from "next/dist/server/app-render/types";
import { AxiosError } from "axios";

interface Subscription {
  type: string;
}

interface User {
  userId: string;
  actionRole: string;
}

export interface Comapanies {
  _id: string;
  companySize: any;
  createdAt: string;
  createdBy: string;
  industry: string;
  name: string;
  primaryContact: string;
  sameBillingAndPostal: boolean;
  secondaryContact: string;
  status: string;
  subscription: Subscription;
  updatedAt: string;
  users: User[];
}

export interface CompanyResponse {
  statusCode: number;
  data: Comapanies;
}

export interface Data {
  data?: { count?: number; rows?: Comapanies[]; statusCode?: number };
}

type RFState = {
  companies: Data;
  errorMessage?: string;
  successMessage?: string;
  onError?: boolean;
  loading?: boolean;
  addCompany: (newCompany: any) => void;
  fetchAllCompanies: () => void;
  updateCompanies: (data: Partial<Comapanies>) => void;
  deleteCompany: (id: any) => void;
  // fetchSingleCompany: (id: number) => Company | undefined;
  // updateCompany: (id: number, updatedCompany: Partial<Company>) => void;
  // deleteCompany: (id: number) => void;
};

const useCompanyStore = create<RFState>()(
  devtools(
    (set, get) => ({
      companies: {},
      fetchAllCompanies: async () => {
        set({ loading: true, onError: false, errorMessage: "" });

        const response = await Companies.getCompanies();

        if (response.statusCode === 200) {
          set({
            companies: response,
            loading: false,
            onError: false,
            errorMessage: "",
          });
        } else {
          set({
            errorMessage: response.data.message,
            onError: true,
            loading: false,
          });
        }
      },
      updateCompanies: async (data: Partial<Comapanies>) => {
        if (!data._id) return;
        set({ loading: true });
        try {
          const response = await Companies.updateCompany(data);
          console.log("res", response);
          if (response.statusCode === 200) {
            set({ loading: false, onError: false, errorMessage: "" });
          } else {
            set({
              loading: false,
              onError: true,
              errorMessage: response.data.message || "Error updating company",
            });
          }
        } catch (error) {
          set({ loading: false, onError: true });
          if (error instanceof AxiosError) {
            set({ errorMessage: error.message });
          }
        }
      },
      addCompany: async (data: any) => {
        set({ loading: true });
        const response: CompanyResponse = await Companies.addCompany(data);

        if (response.statusCode === 200) {
          set({
            loading: false,
            onError: false,
            errorMessage: "",
            successMessage: "Successful adding company",
          });
        } else {
          set({
            loading: false,
            onError: true,
            errorMessage: "Error adding Company",
          });
        }
      },
      deleteCompany: async (id: any) => {
        if (!id) return;
        set({ loading: true });
        const response = await Companies.deleteCompany(id);

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
      // fetchSingleCompany: (id) => {
      //   return get().company.find((company) => company.id === id);
      // },
      // updateCompany: (id, updatedCompany) => {
      //   set((state) => ({
      //     company: state.company.map((company) =>
      //       company.id === id ? { ...company, ...updatedCompany } : company
      //     ),
      //   }));
      // },
      // deleteCompany: (id) => {
      //   set((state) => ({
      //     company: state.company.filter((company) => company.id !== id),
      //   }));
      // },
    }),
    {
      name: "Company",
    }
  )
);

export default useCompanyStore;

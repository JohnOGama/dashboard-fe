import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import COMPANY from "@/MOCK_DATA/Company.json";
import { Companies } from "@/services/api";

interface Subscription {
  type: string;
}

interface User {
  userId: string;
  actionRole: string;
}

interface Company {
  _id: string;
  companySize: number;
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

type RFState = {
  company: Company[];
  errorMessage?: string;
  successMessage?: string;
  onError?: boolean;
  loading?: boolean;
  addCompany: (newCompany: Company) => void;
  fetchAllCompanies: () => void;
  // fetchSingleCompany: (id: number) => Company | undefined;
  // updateCompany: (id: number, updatedCompany: Partial<Company>) => void;
  // deleteCompany: (id: number) => void;
};

const useCompanyStore = create<RFState>()(
  devtools(
    (set, get) => ({
      company: [],
      addCompany: (newCompany) => {
        set((state) => ({
          company: [...state.company, newCompany],
        }));
      },
      fetchAllCompanies: async () => {
        set({ loading: true });
        const companies = await Companies.getCompanies();

        console.log("compan", companies);
        if (companies.statusCode === 200) {
          set(() => ({
            company: companies.data.rows,
            loading: false,
            onError: false,
            errorMessage: "",
          }));
        } else {
          set(() => ({
            errorMessage: companies.data.message,
            onError: true,
            loading: false,
          }));
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

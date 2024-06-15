import { Comapanies } from "@/store/useCompanyStore";
import { requests } from "./ApiServices";

export const Companies = {
  getCompanies: () => requests.get("/api/admin/companies"),
  updateCompany: (data: Partial<Comapanies>) =>
    requests.put(`/api/admin/companies/${data._id}`, data),
  addCompany: (data: Partial<Comapanies>) =>
    requests.post("/api/admin/companies", data),
  deleteCompany: (id: any) => requests.delete(`/api/admin/companies/${id}`),
};

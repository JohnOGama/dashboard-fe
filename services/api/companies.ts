import { requests } from "./ApiServices";

export const Companies = {
  getCompanies: () => requests.get("/api/admin/companies"),
};

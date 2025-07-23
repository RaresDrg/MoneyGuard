import { apiClient } from "../utils";

export async function fetchCategories() {
  const res = await apiClient.get("/api/transactions/categories");
  return res.data;
}

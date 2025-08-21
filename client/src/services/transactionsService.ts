import { apiClient, delay } from "../utils";

export async function fetchCategories() {
  const res = await apiClient.get("/api/transactions/categories");
  return res.data;
}

export async function fetchStatistics(startDate: string, endDate: string) {
  // todo
  await delay(500);
  const res = await apiClient.get("/api/transactions/statistics", {
    params: { startDate, endDate },
  });
  return res.data;
}

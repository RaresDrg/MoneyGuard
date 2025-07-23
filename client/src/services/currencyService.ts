import { apiClient } from "../utils";

export async function fetchRates() {
  const res = await apiClient.get("/api/currency");
  return res.data;
}

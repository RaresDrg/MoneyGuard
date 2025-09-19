import { apiClient } from "../utils";

export async function fetchRates() {
  const res = await apiClient.get("/exchangeRates");
  return res.data;
}

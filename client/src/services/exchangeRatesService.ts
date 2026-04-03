import apiClient from "../api/apiClient";

export async function fetchRates() {
  const res = await apiClient.get("/exchangeRates");
  return res.data;
}

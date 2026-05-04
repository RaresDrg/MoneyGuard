import apiClient from "../api/apiClient";

export async function fetchRates() {
  const res = await apiClient.get("/exchange-rates");
  return res.data;
}

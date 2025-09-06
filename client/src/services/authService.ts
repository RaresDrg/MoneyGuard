import { apiClient } from "../utils";

export const forgotPassword = async (email: string) => {
  // todo un mic delay
  const res = await apiClient.post("/api/users/forgot-password", { email });
  return res.data;
};

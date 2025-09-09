import { apiClient, requestWithDelay } from "../utils";

export const forgotPassword = async (email: string) => {
  const res = await requestWithDelay(
    apiClient.post("/api/users/forgot-password", { email }),
    1000
  );

  return res.data;
};

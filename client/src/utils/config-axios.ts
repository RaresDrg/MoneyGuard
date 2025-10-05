import axios from "axios";
import { forceLogout } from ".";

const IN_DEVELOPMENT = import.meta.env.MODE === "development";

const apiClient = axios.create({
  baseURL: IN_DEVELOPMENT ? "http://localhost:3000/api" : "/api",
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const sessionId = sessionStorage.getItem("sessionId");
  if (sessionId) config.headers.Authorization = `Bearer ${sessionId}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    const sessionId = response.headers["session-id"];
    if (sessionId) sessionStorage.setItem("sessionId", sessionId);
    return response;
  },
  (error) => {
    if (
      error.response?.status === 401 &&
      !error.config?.url?.includes("users/logout")
    ) {
      forceLogout();
    }
    return Promise.reject(error);
  }
);

export default apiClient;

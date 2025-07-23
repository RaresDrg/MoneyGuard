import axios from "axios";
import { handleForceLogout } from "./handleForceLogout";
import { API_BASE_URL } from "../constants";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error?.response?.status === 401 && !error.config?._retry) {
      error.config._retry = true;

      if (!error.config.url.includes("/api/users/logout")) {
        handleForceLogout(error.response.data.message);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

import { apiClient } from "../utils";

type NewUser = { name: string; email: string; password: string };
type LoginCredentials = { email: string; loginPassword: string };
type PasswordChangeData = { password: string; validationToken: string };

async function register(userData: NewUser) {
  const res = await apiClient.post("/users/register", userData);
  return res.data;
}

async function login(userData: LoginCredentials) {
  const res = await apiClient.post("/users/login", userData);
  return res.data;
}

async function logout() {
  await apiClient.delete("/users/logout");
}

async function forgotPassword(email: string) {
  const res = await apiClient.post("/users/forgot-password", { email });
  return res.data;
}

async function changePassword(data: PasswordChangeData) {
  const res = await apiClient.patch("/users/update-password", data);
  return res.data;
}

export { register, login, logout, forgotPassword, changePassword };

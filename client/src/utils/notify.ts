import { toast } from "react-toastify";
import type { ErrorResponse } from "../App.types";

export const notify = {
  success(message: string) {
    toast.success(message);
  },
  error(error: ErrorResponse) {
    if (error.status === 401) return;
    toast.error(`${error.response?.data?.message ?? "Internal server error"}`);
  },
  warning(message: string) {
    toast.warning(message);
  },
};

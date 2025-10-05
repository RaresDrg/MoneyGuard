import { resetStore, notify } from ".";
import { store } from "../redux/store";

export function forceLogout() {
  if (store.getState().auth.isLoggedIn) {
    resetStore();
    sessionStorage.removeItem("sessionId");
    notify.warning("Your session has expired. Please, log in again !");
  }
}

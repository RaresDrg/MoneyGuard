import { store } from "../redux/store";
import { forceLogout } from "../redux/auth/slice";
import { setModalsClose } from "../redux/modals/slice";
import { notify } from "./notify";

export function handleForceLogout(errorMessage: string) {
  store.dispatch(forceLogout());
  store.dispatch(setModalsClose());

  notify.warning(`${errorMessage}. Please, log in again !`);
}

import { resetStore, notify } from ".";

export function handleForceLogout(errorMessage: string) {
  resetStore();
  notify.warning(`${errorMessage}. Please, log in again !`);
}

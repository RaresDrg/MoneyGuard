import { store } from "../redux/store";
import { resetAuth } from "../redux/auth/slice";
import { resetTransactions } from "../redux/transactions/slice";
import { setModalsClose as resetModals } from "../redux/modals/slice";

export function resetStore() {
  store.dispatch(resetAuth());
  store.dispatch(resetTransactions());
  store.dispatch(resetModals());
}

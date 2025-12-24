import { store } from "../redux/store";
import { resetSlice as resetGeneralSlice } from "../redux/general/actions";
import { resetSlice as resetAuthSlice } from "../redux/auth/actions";
import { resetSlice as resetTransactionsSlice } from "../redux/transactions/actions";

export function resetStore() {
  store.dispatch(resetGeneralSlice());
  store.dispatch(resetAuthSlice());
  store.dispatch(resetTransactionsSlice());
}

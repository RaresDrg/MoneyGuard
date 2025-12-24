import { useSelector } from "react-redux";
import type { RootState } from "../App.types";
import generalSelectors from "../redux/general/selectors";
import authSelectors from "../redux/auth/selectors";
import transactionsSelectors from "../redux/transactions/selectors";

const allSelectors = {
  ...generalSelectors,
  ...authSelectors,
  ...transactionsSelectors,
};

type TypedSelector<K extends keyof typeof allSelectors> = (
  state: RootState
) => ReturnType<(typeof allSelectors)[K]>;

function useReduxState<K extends keyof typeof allSelectors>(key: K) {
  return useSelector(allSelectors[key] as TypedSelector<K>);
}

export default useReduxState;

import type { RootState } from "../../App.types";

const authSelectors = {
  selectIsLoggedIn: (state: RootState) => state.auth.isLoggedIn,
  selectUserName: (state: RootState) => state.auth.user?.name ?? "",
  selectUserEmail: (state: RootState) => state.auth.user?.email ?? "",
  selectUserBalance: (state: RootState) => state.auth.user?.balance ?? 0,
};

export default authSelectors;

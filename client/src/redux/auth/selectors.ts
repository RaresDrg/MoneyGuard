import type { RootState } from "../../App.types";

const selectIsLoading = (state: RootState) => state.auth.isLoading;
const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
const selectUser = (state: RootState) => state.auth.user;
const selectBalance = (state: RootState) => state.auth.user?.balance ?? 0;

export default { selectIsLoading, selectIsLoggedIn, selectUser, selectBalance };

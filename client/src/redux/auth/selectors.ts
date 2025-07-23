import type { RootState } from "../../App.types";

const selectIsLoading = (state: RootState) => state.auth.isLoading;
const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
const selectUser = (state: RootState) => state.auth.user;

export default { selectIsLoading, selectIsLoggedIn, selectUser };

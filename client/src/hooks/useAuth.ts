import { useSelector } from "react-redux";
import authSelectors from "../redux/auth/selectors";

const useAuth = () => {
  return {
    isLoading: useSelector(authSelectors.selectIsLoading),
    isLoggedIn: useSelector(authSelectors.selectIsLoggedIn),
    user: useSelector(authSelectors.selectUser),
  };
};

export default useAuth;

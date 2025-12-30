import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from ".";
import { setAuthenticatedUser } from "../redux/auth/actions";
import { authService } from "../services";
import { notify, handleRequestFlow } from "../utils";

const useGoogleAuth = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const authHasFailed = searchParams.has("googleAuthFailed");
  const validationToken = searchParams.get("googleAuthSuccess");

  function notifyFailedAuth() {
    notify.errorMessage("Google authentication failed. Please try again.");
  }

  function handleAuthFailed() {
    notifyFailedAuth();
    searchParams.delete("googleAuthFailed");
    setSearchParams(searchParams);
  }

  function finalizeAuth(validationToken: string) {
    handleRequestFlow({
      request: () => authService.googleAuth(validationToken),
      loadingType: "spinner",
      onSuccess: (res) => {
        dispatch(setAuthenticatedUser(res.data));
        notify.success(`Welcome, ${res.data.name} !`);
      },
      onError: () => notifyFailedAuth(),
      onFinally: () => {
        searchParams.delete("googleAuthSuccess");
        setSearchParams(searchParams);
      },
    });
  }

  useEffect(() => {
    if (authHasFailed) handleAuthFailed();
    else if (validationToken) finalizeAuth(validationToken);
  }, [authHasFailed, validationToken]);
};

export default useGoogleAuth;

import { createElement } from "react";
import { useReduxState } from "../../../hooks";
import LoadingScreen from "./LoadingScreen/LoadingScreen.styled";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner.styled";

const loaderMap = {
  screen: LoadingScreen,
  spinner: LoadingSpinner,
};

const GlobalLoading = () => {
  const activeLoader = useReduxState("selectActiveLoader");
  return activeLoader ? createElement(loaderMap[activeLoader]) : null;
};

export default GlobalLoading;

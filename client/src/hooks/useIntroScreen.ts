import { useState } from "react";
import { useLocation } from "react-router-dom";

const useIntroScreen = () => {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(() => {
    if (location.state?.skipIntro) return false;
    if (sessionStorage.getItem("introWasShown") === "true") return false;
    return true;
  });

  function onIntroEnd() {
    setShowIntro(false);
    sessionStorage.setItem("introWasShown", "true");
  }

  return { showIntro, onIntroEnd };
};

export default useIntroScreen;

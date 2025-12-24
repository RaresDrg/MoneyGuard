import { useState } from "react";

const useIntroScreen = () => {
  const [showIntro, setShowIntro] = useState(() => {
    return sessionStorage.getItem("introWasShown") !== "true";
  });

  function onIntroEnd() {
    setShowIntro(false);
    sessionStorage.setItem("introWasShown", "true");
  }

  return { showIntro, onIntroEnd };
};

export default useIntroScreen;

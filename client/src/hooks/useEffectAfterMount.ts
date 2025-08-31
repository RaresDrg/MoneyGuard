import { useEffect, useRef, DependencyList, EffectCallback } from "react";

const useEffectAfterMount = (effect: EffectCallback, deps: DependencyList) => {
  const isOnMounting = useRef(true);

  useEffect(() => {
    if (isOnMounting.current) {
      isOnMounting.current = false;
      return;
    }

    return effect();
  }, deps);
};

export default useEffectAfterMount;

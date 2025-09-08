import { useEffect, useState } from "react";
import { useMotionValue, animate } from "framer-motion";

function useAnimatedNumber(target: number) {
  const [value, setValue] = useState(0);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (motionValue.get() === target) return;

    const controls = animate(motionValue, target, {
      duration: 1,
      ease: "easeOut",
      onUpdate: (latest) => setValue(latest),
    });

    return () => controls.stop();
  }, [target]);

  return value;
}

export default useAnimatedNumber;

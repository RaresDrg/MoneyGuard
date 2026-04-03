import { TypeAnimation } from "react-type-animation";

type Props = {
  className?: string;
  onSceneClose: () => void;
};

const IntroScreen = ({ className, onSceneClose }: Props) => {
  function handleClose(element: HTMLElement | null) {
    const parent = element?.parentElement;
    if (parent) {
      parent?.classList.add("hidden");
      parent.addEventListener("animationend", onSceneClose, { once: true });
    }
  }

  return (
    <div className={className} aria-hidden="true">
      <TypeAnimation
        wrapper="p"
        cursor={false}
        omitDeletionAnimation={true}
        sequence={[
          1200,
          "MONEY SPEAKS ONLY ONE LANGUAGE:",
          1000,
          (el) => el?.classList.add("italic"),
          `"If you save me today,\n I will save you tomorrow"`,
          1000,
          "",
          200,
          (el) => handleClose(el),
        ]}
      />
    </div>
  );
};

export default IntroScreen;

import { TypeAnimation } from "react-type-animation";

type Props = {
  className?: string;
  onSceneClose?: () => void;
};

const IntroScreen = ({ className, onSceneClose }: Props) => {
  return (
    <div className={className}>
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
          (el) => {
            el?.parentElement?.classList.add("hidden");
            if (onSceneClose) setTimeout(() => onSceneClose(), 1000);
          },
        ]}
      />
    </div>
  );
};

export default IntroScreen;

import { getCloudinaryVideo } from "../../../../utils";

type Props = {
  className?: string;
};

const LoadingScreen = ({ className }: Props) => {
  const { src, poster } = getCloudinaryVideo("loading-screen");

  return (
    <div className={className}>
      <video autoPlay muted loop preload="auto" poster={poster} playsInline>
        <source src={src} type="video/mp4" />
      </video>
      <span className="loader">Loading</span>
    </div>
  );
};

export default LoadingScreen;

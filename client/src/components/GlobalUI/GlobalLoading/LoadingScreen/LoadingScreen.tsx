import { getCloudinaryVideo } from "../../../../utils";

type Props = {
  className?: string;
};

const LoadingScreen = ({ className }: Props) => {
  const { src, poster } = getCloudinaryVideo("loading-screen");

  return (
    <div className={className}>
      <video
        muted
        autoPlay
        loop
        preload="auto"
        poster={poster}
        playsInline
        disablePictureInPicture
        controls={false}
        aria-hidden="true"
      >
        <source src={src} type="video/mp4" />
      </video>
      <span className="loader" role="status">
        Loading
      </span>
    </div>
  );
};

export default LoadingScreen;

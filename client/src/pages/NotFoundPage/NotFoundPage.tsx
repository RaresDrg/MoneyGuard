import { useEffect, useRef } from "react";
import { getCloudinaryVideo } from "../../utils";
import { Section } from "../../components/common";

type Props = {
  className?: string;
};

const NotFoundPage = ({ className }: Props) => {
  const { src, poster } = getCloudinaryVideo("not-found");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.5;
  }, []);

  return (
    <Section className={className}>
      <div>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          preload="auto"
          poster={poster}
          playsInline
        >
          <source src={src} type="video/mp4" />
        </video>
        <h1>Page not found</h1>
        <span className="status">404</span>
        <p>
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
      </div>
    </Section>
  );
};

export default NotFoundPage;

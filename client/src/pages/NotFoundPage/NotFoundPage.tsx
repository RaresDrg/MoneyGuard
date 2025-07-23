import { useEffect, useRef } from "react";
import { Section } from "../../components/common";

type Props = {
  className?: string;
};

const NotFoundPage = ({ className: styles }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc =
    "https://cdn.pixabay.com/video/2024/01/31/198754-908438389_large.mp4";

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <Section variant="gradientBg" className={styles}>
      <>
        <video autoPlay muted loop ref={videoRef}>
          <source src={videoSrc} type="video/mp4" />
        </video>
        <h1>Page not found</h1>
        <h2 className="animate__animated animate__flash animate__infinite animate__slower">
          404
        </h2>
        <p>
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
      </>
    </Section>
  );
};

export default NotFoundPage;

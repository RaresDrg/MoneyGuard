type Props = {
  className?: string;
};

const LoadingScreen = ({ className: styles }: Props) => {
  const videoSrc =
    "https://cdn.pixabay.com/video/2017/11/13/12924-242538649_large.mp4";

  return (
    <div className={`${styles} animate__animated animate__fadeIn`}>
      <video autoPlay muted loop>
        <source src={videoSrc} type="video/mp4" />
      </video>
      <span className="loader">Loading</span>
    </div>
  );
};

export default LoadingScreen;

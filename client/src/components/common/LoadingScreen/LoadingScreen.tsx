import ReactDOM from "react-dom";

type Props = {
  className?: string;
};

const LoadingScreen = ({ className: styles }: Props) => {
  const videoSrc =
    "https://cdn.pixabay.com/video/2017/11/13/12924-242538649_large.mp4";

  return ReactDOM.createPortal(
    <div className={`${styles} animate__animated animate__fadeIn`}>
      <video autoPlay muted loop>
        <source src={videoSrc} type="video/mp4" />
      </video>
      <span className="loader">Loading</span>
    </div>,
    document.getElementById("spinner-root")!
  );
};

export default LoadingScreen;

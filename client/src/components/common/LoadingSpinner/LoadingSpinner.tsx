import ReactDOM from "react-dom";

type Props = {
  className?: string;
};

const LoadingSpinner = ({ className: styles }: Props) => {
  return ReactDOM.createPortal(
    <div className={`${styles} animate__animated animate__fadeIn`}>
      <div className="loader"></div>
    </div>,
    document.getElementById("spinner-root")!
  );
};

export default LoadingSpinner;

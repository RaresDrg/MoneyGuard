type Props = {
  className?: string;
};

const LoadingSpinner = ({ className: styles }: Props) => {
  return (
    <div className={`${styles} animate__animated animate__fadeIn`}>
      <div className="loader"></div>
    </div>
  );
};

export default LoadingSpinner;

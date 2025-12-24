type Props = {
  className?: string;
};

const LoadingSpinner = ({ className }: Props) => {
  return (
    <div className={className}>
      <span className="loader"></span>
    </div>
  );
};

export default LoadingSpinner;

type Props = {
  className?: string;
};

const LoadingSpinner = ({ className }: Props) => {
  return (
    <div className={className}>
      <span className="loader" role="status" aria-label="Loading"></span>
    </div>
  );
};

export default LoadingSpinner;

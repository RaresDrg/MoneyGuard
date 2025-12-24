type Props = {
  className?: string;
  onClick: () => void;
};

const DeleteButton = ({ className, onClick }: Props) => {
  return (
    <button type="button" className={className} onClick={onClick}>
      Delete
    </button>
  );
};

export default DeleteButton;

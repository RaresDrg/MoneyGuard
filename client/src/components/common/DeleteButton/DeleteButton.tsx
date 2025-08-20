type Props = {
  className?: string;
  handleClick: () => void;
};

const DeleteButton = ({ className: styles, handleClick }: Props) => {
  return (
    <button type="button" className={styles} onClick={handleClick}>
      Delete
    </button>
  );
};

export default DeleteButton;

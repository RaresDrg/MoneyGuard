import { renderIcon } from "../../../utils";

type Props = {
  className?: string;
  handleClick: () => void;
};

const AddButton = ({ className, handleClick }: Props) => {
  const styles = `${className} animate__animated animate__flip`;

  return (
    <button
      type="button"
      className={styles}
      onClick={handleClick}
      aria-label={"add-button"}
    >
      {renderIcon("icon-plus")}
    </button>
  );
};

export default AddButton;

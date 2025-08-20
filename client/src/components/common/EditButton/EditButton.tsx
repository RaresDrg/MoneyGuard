import { renderIcon } from "../../../utils";

type Props = {
  className?: string;
  handleClick: () => void;
};

const EditButton = ({ className: styles, handleClick }: Props) => {
  return (
    <button type="button" className={styles} onClick={handleClick}>
      Edit {renderIcon("icon-pencil")}
    </button>
  );
};

export default EditButton;

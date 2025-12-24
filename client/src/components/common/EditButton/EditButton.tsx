import { renderIcon } from "../../../utils";

type Props = {
  className?: string;
  onClick: () => void;
};

const EditButton = ({ className, onClick }: Props) => {
  return (
    <button type="button" className={className} onClick={onClick}>
      Edit {renderIcon("icon-pencil")}
    </button>
  );
};

export default EditButton;

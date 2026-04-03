import { Icon } from "..";

type Props = {
  className?: string;
  onClick: () => void;
};

const EditButton = ({ className, onClick }: Props) => {
  return (
    <button type="button" className={className} onClick={onClick}>
      Edit
      <Icon name="icon-pencil" />
    </button>
  );
};

export default EditButton;

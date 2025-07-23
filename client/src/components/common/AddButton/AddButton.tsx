import { renderIcon } from "../../../utils";
import { useModals } from "../../../hooks";

type Props = {
  className?: string;
};

const AddButton = ({ className: styles }: Props) => {
  const { openModal } = useModals();

  return (
    <button
      type="button"
      className={`${styles} animate__animated animate__slideInUp`}
      onClick={() => openModal("addModal")}
    >
      {renderIcon("icon-plus")}
    </button>
  );
};

export default AddButton;

import { renderIcon } from "../../../utils";
import { useModals } from "../../../hooks";

type Props = {
  className?: string;
};

const LogoutBtn = ({ className: styles }: Props) => {
  const { openModal } = useModals();

  return (
    <button
      className={styles}
      type="button"
      onClick={() => openModal("logoutModal")}
    >
      {renderIcon("icon-exit")}
      <span> Exit</span>
    </button>
  );
};

export default LogoutBtn;

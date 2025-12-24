import { renderIcon } from "../../utils";

type Props = {
  className?: string;
};

const GoogleButton = ({ className }: Props) => {
  return (
    <button type="button" className={className}>
      {renderIcon("icon-google")}
      <span>Continue with Google</span>
    </button>
  );
};

export default GoogleButton;

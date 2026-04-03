import { GOOGLE_AUTH_URL } from "../../constants";
import { useGoogleAuth } from "../../hooks";
import { Icon } from "../common";

type Props = {
  className?: string;
};

const GoogleButton = ({ className }: Props) => {
  useGoogleAuth();

  return (
    <a href={GOOGLE_AUTH_URL} className={className}>
      <Icon name="icon-google" />
      <span>Continue with Google</span>
    </a>
  );
};

export default GoogleButton;

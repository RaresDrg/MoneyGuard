import icons from "../../../assets/icons/icons.svg";

type Props = {
  className?: string;
  label?: string;
  name: string;
};

const Icon = ({ className, label, name }: Props) => {
  return (
    <svg
      className={className}
      focusable={false}
      role={label ? "img" : undefined}
      aria-hidden={label ? undefined : "true"}
      aria-label={label ?? undefined}
    >
      <use href={`${icons}#${name}`}></use>
    </svg>
  );
};
export default Icon;

import icons from "../assets/icons/icons.svg";

export function renderIcon(name: string, className?: string) {
  return (
    <svg className={className}>
      <use href={`${icons}#${name}`}></use>
    </svg>
  );
}

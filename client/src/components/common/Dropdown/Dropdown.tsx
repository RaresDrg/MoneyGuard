import { useState, useEffect } from "react";
import { renderIcon } from "../../../utils";

type Props = {
  className?: string;
  options: readonly string[];
  currentOption: string;
  handlerFunction: (selectedOption: string) => void;
};

const Dropdown = (props: Props) => {
  const { className: styles, options, currentOption, handlerFunction } = props;
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    function hideDropdown(e: MouseEvent) {
      if (
        !(e.target as HTMLElement).closest("button.isTriggered") &&
        !(e.target as HTMLElement).classList.contains("isVisible")
      ) {
        setIsDropdownVisible(false);
      }
    }

    if (isDropdownVisible) document.addEventListener("mousedown", hideDropdown);
    return () => document.removeEventListener("mousedown", hideDropdown);
  }, [isDropdownVisible]);

  return (
    <div className={styles}>
      <button
        type="button"
        className={isDropdownVisible ? "isTriggered" : ""}
        onClick={() => setIsDropdownVisible((prev) => !prev)}
      >
        <span>{currentOption}</span>
        {renderIcon("icon-dropdown")}
      </button>

      <ul className={isDropdownVisible ? "isVisible" : ""}>
        {options.map((item, index) => (
          <li key={index} onMouseDown={() => handlerFunction(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;

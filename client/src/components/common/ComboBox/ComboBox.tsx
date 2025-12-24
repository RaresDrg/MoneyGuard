import { useState, useEffect, useRef } from "react";
import { renderIcon } from "../../../utils";

type Props<T extends string> = {
  className?: string;
  options: readonly T[];
  handlerFunction: (selectedOption: T) => void;
  currentOption?: T;
  placeholder?: string;
  searchEnabled?: boolean;
};

const ComboBox = <T extends string>(props: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(props.currentOption ?? "");

  const comboBoxRef = useRef<HTMLDivElement>(null);
  const searchQuery = useRef("");

  const displayedOptions =
    props.searchEnabled && searchQuery.current
      ? props.options.filter((item) =>
          item.toLowerCase().includes(searchQuery.current.toLowerCase().trim())
        )
      : props.options;

  useEffect(() => {
    if (isOpen) document.addEventListener("mousedown", onOutsideMouseDown);
    return () => document.removeEventListener("mousedown", onOutsideMouseDown);
  }, [isOpen]);

  function onOutsideMouseDown(e: MouseEvent) {
    if (
      !comboBoxRef.current?.contains(e.target as Node) &&
      !searchQuery.current
    ) {
      setIsOpen(false);
    }
  }

  function onSelect(selectedOption: T) {
    props.handlerFunction(selectedOption);
    setValue(selectedOption);
    setIsOpen(false);
    if (searchQuery.current) setTimeout(() => (searchQuery.current = ""), 0);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    searchQuery.current = e.target.value;
  }

  return (
    <div
      ref={comboBoxRef}
      className={`${props.className} ${isOpen ? "isOpen" : ""}`}
    >
      {props.searchEnabled ? (
        <label>
          <input
            value={value}
            placeholder={props.placeholder ?? "Select option"}
            onFocus={() => setIsOpen(true)}
            onChange={onChange}
          />
          {renderIcon("icon-dropdown")}
        </label>
      ) : (
        <button type="button" onClick={() => setIsOpen((prev) => !prev)}>
          {value || props.placeholder || "Select option"}
          {renderIcon("icon-dropdown")}
        </button>
      )}

      <ul>
        {displayedOptions.length > 0 ? (
          displayedOptions.map((item) => (
            <li key={item} onMouseDown={() => onSelect(item)}>
              {item}
            </li>
          ))
        ) : (
          <li className="fallback-option">❌ No matches found ❌</li>
        )}
      </ul>
    </div>
  );
};

export default ComboBox;

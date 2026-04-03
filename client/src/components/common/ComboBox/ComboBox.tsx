import { useState, useEffect, useRef, useId } from "react";
import { Icon } from "..";

type Props<T extends string> = {
  className?: string;
  noMatchMessage?: string;
  placeholder?: string;
  initialValue?: T;
  options: readonly T[];
  handlerFunction: (selectedOption: T) => void;
};

const ComboBox = <T extends string>(props: Props<T>) => {
  const [value, setValue] = useState(props.initialValue ?? "");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);

  const liRefs = useRef<(HTMLLIElement | null)[]>([]);
  const searchQuery = useRef("");

  const displayedOptions = searchQuery.current
    ? props.options.filter((item) =>
        item.toLowerCase().includes(searchQuery.current.toLowerCase().trim()),
      )
    : props.options;

  const listId = useId();

  function handleSelect(selectedOption: T) {
    props.handlerFunction(selectedOption);
    setValue(selectedOption);
    setIsOpen(false);
  }

  function handleOpen() {
    if (searchQuery.current !== "") searchQuery.current = "";
    const index = props.options.findIndex((opt) => opt === value);
    setHighlightIndex(index !== -1 ? index : 0);
    setIsOpen(true);
  }

  function onLabelMouseDown(e: React.MouseEvent<HTMLElement>) {
    if (e.button !== 0) {
      e.preventDefault();
      return;
    }

    if (!isOpen) handleOpen();
    else if (!(e.target instanceof HTMLInputElement)) {
      e.preventDefault();
      if (!searchQuery.current) setIsOpen(false);
    }
  }

  function onFocus() {
    if (!isOpen) handleOpen();
  }

  function onBlur() {
    if (isOpen && !searchQuery.current) setIsOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    e.stopPropagation();

    if (!isOpen) {
      if (["ArrowDown", "ArrowUp", "Enter"].includes(e.key)) {
        e.preventDefault();
        handleOpen();
      }
      return;
    }

    switch (e.key) {
      case "Escape": {
        if (!searchQuery.current) setIsOpen(false);
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        if (displayedOptions.length > 0) {
          setHighlightIndex((prev) =>
            prev < displayedOptions.length - 1 ? prev + 1 : 0,
          );
        }
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        if (displayedOptions.length > 0) {
          setHighlightIndex((prev) =>
            prev > 0 ? prev - 1 : displayedOptions.length - 1,
          );
        }
        break;
      }
      case "PageDown": {
        e.preventDefault();
        if (displayedOptions.length > 0) {
          setHighlightIndex((prev) =>
            Math.min(prev + 10, displayedOptions.length - 1),
          );
        }
        break;
      }
      case "PageUp": {
        e.preventDefault();
        if (displayedOptions.length > 0) {
          setHighlightIndex((prev) => Math.max(prev - 10, 0));
        }
        break;
      }
      case "Home": {
        e.preventDefault();
        if (displayedOptions.length > 0) setHighlightIndex(0);
        break;
      }
      case "End": {
        e.preventDefault();
        if (displayedOptions.length > 0)
          setHighlightIndex(displayedOptions.length - 1);
        break;
      }
      case "Enter": {
        e.preventDefault();
        const selectedOption = displayedOptions[highlightIndex];
        if (selectedOption) handleSelect(selectedOption);
        break;
      }
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    searchQuery.current = e.target.value;
    if (highlightIndex !== 0) setHighlightIndex(0);
    if (!isOpen) setIsOpen(true);
  }

  useEffect(() => {
    if (isOpen) {
      liRefs.current[highlightIndex]?.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "smooth",
      });
    }
  }, [highlightIndex, isOpen]);

  return (
    <div className={`${props.className} ${isOpen ? "isOpen" : ""}`}>
      <label onMouseDown={onLabelMouseDown}>
        <input
          value={value}
          placeholder={props.placeholder ?? "Select an option"}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onChange={onChange}
          role="combobox"
          aria-label={props.placeholder ?? "Select an option"}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            isOpen ? `combo-option-${highlightIndex}` : undefined
          }
        />
        <Icon name="icon-dropdown" />
      </label>
      <ul
        tabIndex={-1}
        onMouseDown={(e) => e.preventDefault()}
        id={listId}
        role="listbox"
      >
        {displayedOptions.length > 0 ? (
          displayedOptions.map((item, index) => (
            <li
              key={item}
              ref={(el) => {
                liRefs.current[index] = el;
              }}
              className={index === highlightIndex ? "highlighted" : ""}
              onMouseEnter={() => setHighlightIndex(index)}
              onMouseLeave={() => setHighlightIndex(-1)}
              onClick={() => handleSelect(item)}
              id={`combo-option-${index}`}
              role="option"
              aria-selected={index === highlightIndex}
            >
              {item}
            </li>
          ))
        ) : (
          <li
            className="fallback-option"
            aria-live="polite"
            aria-disabled="true"
          >
            {props.noMatchMessage ?? "❌ No matches found ❌"}
          </li>
        )}
      </ul>
    </div>
  );
};

export default ComboBox;

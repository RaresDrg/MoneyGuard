import { useState, useEffect, useRef, useId } from "react";
import { Icon } from "..";

type Props<T extends string> = {
  className?: string;
  label: T | string;
  options: readonly T[];
  handlerFunction: (selectedOption: T) => void;
};

const Select = <T extends string>(props: Props<T>) => {
  const [displayedValue, setDisplayedValue] = useState(props.label);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const liRefs = useRef<(HTMLLIElement | null)[]>([]);

  const listId = useId();

  function handleSelect(selectedOption: T) {
    props.handlerFunction(selectedOption);
    setDisplayedValue(selectedOption);
    setIsOpen(false);
  }

  function toggleOpen() {
    setIsOpen((prev) => {
      if (!prev) {
        const index = props.options.findIndex((opt) => opt === displayedValue);
        setHighlightIndex(index !== -1 ? index : 0);
      }
      return !prev;
    });
  }

  function onKeyDown(e: React.KeyboardEvent) {
    e.stopPropagation();
    switch (e.key) {
      case "Escape": {
        setIsOpen(false);
        break;
      }
      case "Tab": {
        setIsOpen(false);
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev < props.options.length - 1 ? prev + 1 : 0,
        );
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev > 0 ? prev - 1 : props.options.length - 1,
        );
        break;
      }
      case "PageDown": {
        e.preventDefault();
        setHighlightIndex((prev) =>
          Math.min(prev + 10, props.options.length - 1),
        );
        break;
      }
      case "PageUp": {
        e.preventDefault();
        setHighlightIndex((prev) => Math.max(prev - 10, 0));
        break;
      }
      case "Home": {
        e.preventDefault();
        setHighlightIndex(0);
        break;
      }
      case "End": {
        e.preventDefault();
        setHighlightIndex(props.options.length - 1);
        break;
      }
      case "Enter": {
        e.preventDefault();
        const selectedOption = props.options[highlightIndex];
        if (selectedOption) handleSelect(selectedOption);
        break;
      }
    }
  }

  useEffect(() => {
    function onOutsideMouseDown(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setIsOpen(false);
    }

    const btn = buttonRef.current;

    if (isOpen) {
      document.addEventListener("mousedown", onOutsideMouseDown);
      ulRef.current?.focus();
    }
    return () => {
      document.removeEventListener("mousedown", onOutsideMouseDown);
      btn?.focus();
    };
  }, [isOpen]);

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
    <div
      ref={containerRef}
      className={`${props.className} ${isOpen ? "isOpen" : ""}`}
    >
      <button
        type="button"
        ref={buttonRef}
        onClick={toggleOpen}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
      >
        {displayedValue}
        <Icon name="icon-dropdown" />
      </button>
      <ul
        ref={ulRef}
        tabIndex={-1}
        onKeyDown={onKeyDown}
        id={listId}
        role="listbox"
      >
        {props.options.map((item, index) => (
          <li
            key={item}
            ref={(el) => {
              liRefs.current[index] = el;
            }}
            className={index === highlightIndex ? "highlighted" : ""}
            onMouseEnter={() => setHighlightIndex(index)}
            onMouseLeave={() => setHighlightIndex(-1)}
            onClick={() => handleSelect(item)}
            role="option"
            aria-selected={index === highlightIndex}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;

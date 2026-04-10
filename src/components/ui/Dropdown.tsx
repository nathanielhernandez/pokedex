import React, { useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { usePokemonContext } from "../../context/PokemonContext";

type Values = 10 | 25 | 50 | 100;

const OPTIONS: Values[] = [10, 25, 50, 100];

const Dropdown = ({ numPages }: { numPages: number }) => {
  const { state, dispatch } = usePokemonContext();
  const { numberPerPage } = state;
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleOptionSelect = (value: Values) => {
    dispatch({ type: "SET_NUM_PER_PAGE", payload: value });
    setOpen(false);
  };

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  useEffect(() => {
    if (state.pageNumber > numPages)
      dispatch({ type: "SET_PAGE_NUMBER", payload: numPages });
  }, [numberPerPage]);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <button
        className="p-2 border border-neutral-300 rounded-lg flex items-center gap-2"
        onClick={handleClick}
      >
        {numberPerPage}
        {open ? (
          <BiChevronDown className="transfrom rotate-180 transition-transform" />
        ) : (
          <BiChevronDown className="transform rotate-0 transition-transform" />
        )}
      </button>
      {open && (
        <div className="absolute top-full mt-1 bg-neutral-100 border border-neutral-300 shadow-lg flex flex-col p-2 rounded-lg">
          {OPTIONS.map((option) => (
            <button
              key={option}
              className="py-2 px-4 w-full text-left hover:bg-neutral-200 rounded-lg"
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

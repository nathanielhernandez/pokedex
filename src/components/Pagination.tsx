import React, { useEffect, useState } from "react";
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsRight,
  BiChevronsLeft,
} from "react-icons/bi";

import Dropdown from "./ui/Dropdown";
import { usePokemonList } from "../hooks/usePokemonList";
import { usePokemonContext } from "../context/PokemonContext";

type Direction = "NEXT" | "PREV" | "FIRST" | "LAST";
const SIZE: number = 24;

const Pagination = () => {
  const { data, numPages } = usePokemonList();
  const { state, dispatch } = usePokemonContext();
  const { numberPerPage, pageNumber } = state;
  const [inputValue, setInputValue] = useState<number>(pageNumber + 1);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const handlePageClick = (direction: Direction) => {
    if (direction === "NEXT") dispatch({ type: "NEXT_PAGE" });
    else if (direction === "FIRST")
      dispatch({ type: "SET_PAGE_NUMBER", payload: 1 });
    else if (direction === "LAST")
      dispatch({ type: "SET_PAGE_NUMBER", payload: numPages });
    else dispatch({ type: "PREV_PAGE" });
  };

  const startNumber = pageNumber * numberPerPage + 1;
  const endNumber = startNumber + numberPerPage - 1;

  useEffect(() => {
    setInputValue(pageNumber + 1);
  }, [pageNumber]);

  useEffect(() => {
    if (!isDirty) return;

    const handleTimeout = () => {
      if (inputValue < 1 || inputValue > numPages) {
        setInputValue(pageNumber + 1);
      } else {
        dispatch({ type: "SET_PAGE_NUMBER", payload: inputValue });
      }
      setIsDirty(false);
    };

    const timeout = setTimeout(handleTimeout, 500);

    return () => clearTimeout(timeout);
  }, [inputValue, isDirty]);

  return (
    <div className="px-4 flex justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm text-neutral-700">Pokemon Per Page </span>
        <Dropdown numPages={numPages} />
        <span className="text-sm text-neutral-700">
          {startNumber}-{endNumber} of {data?.count} Pokemon
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => handlePageClick("FIRST")}>
          <BiChevronsLeft size={SIZE} />
        </button>
        <button onClick={() => handlePageClick("PREV")}>
          <BiChevronLeft size={SIZE} />
        </button>
        <input
          type="number"
          value={inputValue}
          className="border border-neutral-300 p-2 w-12 text-center rounded-lg appearance-none"
          onChange={(e) => {
            setInputValue(Number(e.target.value));
            setIsDirty(true);
          }}
        />
        <span>of {numPages}</span>
        <button onClick={() => handlePageClick("NEXT")}>
          <BiChevronRight size={SIZE} />
        </button>
        <button onClick={() => handlePageClick("LAST")}>
          <BiChevronsRight size={SIZE} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

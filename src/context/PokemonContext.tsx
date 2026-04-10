import React, { createContext, useContext, useReducer } from "react";

interface PokemonState {
  pageNumber: number;
  numberPerPage: 10 | 25 | 50 | 100;
}

const initialState: PokemonState = {
  pageNumber: 1,
  numberPerPage: 10,
};

type PokemonAction =
  | { type: "NEXT_PAGE" }
  | { type: "PREV_PAGE" }
  | { type: "SET_NUM_PER_PAGE"; payload: 10 | 25 | 50 | 100 };

interface PokemonContextValue {
  state: PokemonState;
  dispatch: React.Dispatch<PokemonAction>;
}

const PokemonContext = createContext<PokemonContextValue | undefined>(
  undefined,
);

const reducer = (state: PokemonState, action: PokemonAction): PokemonState => {
  switch (action.type) {
    case "NEXT_PAGE":
      return { ...state, pageNumber: state.pageNumber + 1 };
    case "PREV_PAGE":
      if (state.pageNumber === 1) return state;
      return { ...state, pageNumber: state.pageNumber - 1 };
    default:
      return state;
  }
};

const PokemonProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PokemonContext.Provider value={{ state, dispatch }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = (): PokemonContextValue => {
  const ctx = useContext(PokemonContext);
  if (!ctx)
    throw new Error("usePokemonContext must be used within a Pokemon Provider");
  return ctx;
};

export default PokemonProvider;

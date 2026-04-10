import React from "react";
import { usePokemonList } from "../hooks/usePokemonList";

import PokeCard from "./PokeCard";
import { usePokemonContext } from "../context/PokemonContext";

interface Pokemon {
  name: string;
  url: string;
}

const Directory = () => {
  const { state } = usePokemonContext();
  const { data } = usePokemonList(state.pageNumber, state.numberPerPage);

  return (
    <>
      <div className="grid grid-cols-5 gap-4 p-4">
        {data?.results?.map((pokemon: Pokemon) => (
          <PokeCard key={pokemon.name} name={pokemon.name} />
        ))}
      </div>
    </>
  );
};

export default Directory;

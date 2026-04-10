import React from "react";
import { usePokemonList } from "../hooks/usePokemonList";

import PokeCard from "./PokeCard";
import Pagination from "./Pagination";

interface Pokemon {
  name: string;
  url: string;
}

const Directory = () => {
  const { data } = usePokemonList();

  return (
    <>
      <Pagination />
      <div className="grid grid-cols-5 gap-4 p-4">
        {data?.results?.map((pokemon: Pokemon) => (
          <PokeCard key={pokemon.name} name={pokemon.name} />
        ))}
      </div>
      <div className="mb-4">
        <Pagination />
      </div>
    </>
  );
};

export default Directory;

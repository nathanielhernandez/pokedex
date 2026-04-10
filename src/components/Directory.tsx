import React from "react";
import { useQuery } from "@tanstack/react-query";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListRespone {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

const getPokemon = async (): Promise<PokemonListRespone> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Directory = () => {
  const query = useQuery({ queryKey: ["pokemon"], queryFn: getPokemon });

  return (
    <div className="grid grid-cols-4 gap-4">
      {query.data?.results?.map((pokemon: Pokemon) => (
        <div key={pokemon.name}>{pokemon.name}</div>
      ))}
    </div>
  );
};

export default Directory;

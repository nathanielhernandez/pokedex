import React from "react";

import { useQuery } from "@tanstack/react-query";
import {
  pokemonKeys,
  fetchPokemon,
  fetchPokemonList,
} from "../lib/api/pokemon";

export const usePokemonList = (page: number, numPerPage: number) => {
  return useQuery({
    queryKey: pokemonKeys.list(page),
    queryFn: () => fetchPokemonList(page, numPerPage),
    staleTime: 1000 * 60 * 5,
  });
};

export const usePokemon = (name: string) => {
  return useQuery({
    queryKey: pokemonKeys.detail(name),
    queryFn: () => fetchPokemon(name),
    staleTime: 1000 * 60 * 5,
  });
};

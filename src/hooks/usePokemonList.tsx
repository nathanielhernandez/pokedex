import React from "react";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  pokemonKeys,
  fetchPokemon,
  fetchPokemonList,
} from "../lib/api/pokemon";
import { usePokemonContext } from "../context/PokemonContext";

export const usePokemonList = () => {
  const { state } = usePokemonContext();
  const { pageNumber, numberPerPage } = state;

  const query = useQuery({
    queryKey: pokemonKeys.list(pageNumber, numberPerPage),
    queryFn: () => fetchPokemonList(pageNumber, numberPerPage),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });

  const numPages = query.data?.count
    ? Math.ceil(query.data?.count / numberPerPage)
    : 0;

  return { ...query, numPages };
};

export const usePokemon = (name: string) => {
  return useQuery({
    queryKey: pokemonKeys.detail(name),
    queryFn: () => fetchPokemon(name),
    staleTime: 1000 * 60 * 5,
  });
};

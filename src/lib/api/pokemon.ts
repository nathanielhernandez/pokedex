const BASE_URL = "https://pokeapi.co/api/v2";

interface PokemonSummary {
  name: string;
  url: string;
}

interface PokemonListRespone {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonSummary[];
}

interface Sprites {
  front_default: string;
}

interface PokemonDetail {
  name: string;
  sprites: Sprites;
}

export const pokemonKeys = {
  all: ["pokemon"] as const,
  list: (page: number, limit: number) =>
    [...pokemonKeys.all, "list", page, limit] as const,
  detail: (name: string) => [...pokemonKeys.all, "detail", name] as const,
};

export const fetchPokemonList = async (
  page: number,
  numPerPage: number,
): Promise<PokemonListRespone> => {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${numPerPage}&offset=${page * numPerPage}`,
  );
  if (!response.ok)
    throw new Error(`Failed to fetch pokemon list: ${response.status}`);
  return response.json();
};

export const fetchPokemon = async (name: string): Promise<PokemonDetail> => {
  const response = await fetch(`${BASE_URL}/pokemon/${name}`);
  if (!response.ok)
    throw new Error(`Failed to fetch pokemone: ${response.status}`);
  return response.json();
};

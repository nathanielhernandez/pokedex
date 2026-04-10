import React from "react";
import { usePokemon } from "../hooks/usePokemonList";

const PokeCard = ({ name }: { name: string }) => {
  const { data } = usePokemon(name);
  console.log(data);

  return (
    <div className="border border-neutral-300 dark:border-neutral-700 flex flex-col rounded-2xl">
      <div className="flex justify-center">
        <img src={data?.sprites.front_default} />
      </div>
      <div className="border-t border-neutral-300 dark:border-neutral-700 p-2">
        <span className="capitalize dark:text-neutral-50 transition-all font-bold">
          {name}
        </span>
      </div>
    </div>
  );
};

export default PokeCard;

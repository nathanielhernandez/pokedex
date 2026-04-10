import React from "react";
import { CgPokemon } from "react-icons/cg";
import ThemeButton from "./ui/ThemeButton";

const Header: React.FC = () => {
  return (
    <header className="h-16 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <CgPokemon size={32} className="dark:text-neutral-50" />
        <h1 className="font-bold dark:text-neutral-50">Pokedex</h1>
      </div>
      <ThemeButton />
    </header>
  );
};

export default Header;

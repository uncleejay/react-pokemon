import React, { createContext, useState, useEffect } from "react";

export const PokemonContext = createContext(null);

export const BASE_URL = process.env.REACT_APP_API_URL;

export function PokemonProvider({ children }) {
  const [listOfPokemon, setListOfPokemon] = useState([]);
  const getListOfPokemon = () => {
    fetch(`${BASE_URL}/pokemon?limit=100000&offset=0`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setListOfPokemon(data.results);
      });
  };
  useEffect(() => {
    getListOfPokemon();
  }, []);
  console.log({ listOfPokemon });
  return (
    <PokemonContext.Provider
      value={{
        listOfPokemon
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

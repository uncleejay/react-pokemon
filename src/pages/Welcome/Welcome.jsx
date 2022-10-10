import React, { useContext, useState, useEffect } from "react";
import Search from "../../components/Search/Search";
import ArrowRight from "../../assets/icon/arrow-right.svg";
import { PokemonContext } from "../../context/pokemon.context";
import "./style.css";

export default function Welcome() {
  const { listOfPokemon } = useContext(PokemonContext);
  const [filteredList, setFilteredList] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [itemShown, setItemShown] = useState(10);
  useEffect(() => {
    setFilteredList(listOfPokemon);
  }, [listOfPokemon]);
  useEffect(() => {
    let newList = Array.from(listOfPokemon).filter(p => p.name.toLowerCase().includes(searchItem.toLowerCase()));
    setFilteredList(newList);
  }, [searchItem]);
  const viewMore = () => {
    setItemShown(itemShown + 10);
  };
  return (
    <div className="Container">
      <div className="ContainerContent">
        <div className="LogoContainer Row--Center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
            alt="Pokemon-Logo"
            className="Pokemon_Logo"
          />
        </div>
        <h1 className="Heading--Large Text--Center">What pokemon are you looking for?</h1>
        <div>
          <Search placeholder="Search pokemon" getSearchText={value => setSearchItem(value)} />
          <div className="ListContainer">
            {filteredList.map((pokemon, index) => {
              if (index < itemShown) {
                return (
                  <div className="List__Card" key={index}>
                    <h2 className="List__Heading">{pokemon.name}</h2>
                    <img src={ArrowRight} alt="ArrowRight" />
                  </div>
                );
              }
              return null;
            })}
            {filteredList.length === 0 ? (
              <div>
                <h2 className="Heading--Medium">No result found</h2>
              </div>
            ) : null}
          </div>
          {filteredList.length !== 0 ? (
            <div className="ButtonContainer Row--Center">
              <button className="Button" onClick={viewMore}>
                View More
              </button>
            </div>
          ) : null}
        </div>
        <div></div>
      </div>
    </div>
  );
}

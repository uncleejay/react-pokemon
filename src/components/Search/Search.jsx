import React from "react";

function Search({ placeholder, getSearchText }) {
  return (
    <input
      className="Input Input--Search"
      type="text"
      placeholder={placeholder}
      onChange={e => getSearchText(e.target.value)}
    />
  );
}

export default Search;

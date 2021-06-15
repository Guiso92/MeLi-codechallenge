import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

import logo from "../shared/assets/Logo_ML.png";
import searchIcon from "../shared/assets/ic_Search.png";
import "../styles/search-bar.scss";

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");
  let history = useHistory();
  const search = new URLSearchParams(useLocation().search).get("search");

  const handleSearch = () => {
    if (!searchText) {
      history.push("/");
    } else {
      history.push(`/items?search=${searchText}`);
    }
  };

  useEffect(() => {
    setSearchText(search);
  }, [search]);

  return (
    <div className="search-bar">
      <div className="search-container">
        <a href="/" className="search-logo">
          <img src={logo} alt="Logo de MercadoLibre" />
        </a>
        <input
          value={searchText}
          type="text"
          placeholder="Nunca dejes de buscar"
          className="search-input"
          name="search-input"
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <button type="button" className="search-button" onClick={handleSearch}>
          <img
            src={searchIcon}
            alt="Icono de busqueda"
            className="search-icon"
          />
        </button>
      </div>
    </div>
  );
}
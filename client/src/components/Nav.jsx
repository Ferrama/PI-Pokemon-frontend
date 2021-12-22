import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css"
import icon from './pokemonlog2.png'
import SearchBar from "./SearchBar";

export default function Nav() {
  return (
    <div className='nav'>
      <div className='titleNav' >
        <img src={icon} alt="" height='60px' width='170px'/>
      </div>
      <div className="searchPaginate">
        <SearchBar />
        </div>
      <div className='divBtn'>
        <Link to="/pokemons"> <button className='btnCreated'>
          Create Pokemon</button></Link>
      </div>
    </div>
  );
}

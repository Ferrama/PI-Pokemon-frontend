import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  filterPokemonByStatus,
  filterPokemonByType,
  orderByName,
  orderByWeight,
  getTypes,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginate from "./Paginate";
import { MdRefresh } from "react-icons/md";
import ReactLoading from "react-loading";

import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const isLoadingPokemons = useSelector((state) => state.isLoadingPokemons);
  const [orden, setOrden] = useState(""); ///
  const [currentPage, setCurrrentPage] = useState(1);
  const [pokemonsPerPage, setpokemonsPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  useEffect(() => {
    
    dispatch(getTypes());
  }, [dispatch]);

  const types = useSelector((state) => state.types);

  const paginado = (pageNumber) => {
    setCurrrentPage(pageNumber);
  };

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  function handleFilterStatus(e) {
    dispatch(filterPokemonByStatus(e.target.value));
  }
  function handleFilterType(e) {
    e.preventDefault();
    dispatch(filterPokemonByType(e.target.value));
    setCurrrentPage(1);
    setOrden(` ${e.target.value}`);
  }
  function handleOrderByName(e) {
    e.preventDefault();
    if (e.target.value !== "ALFABET") {
      dispatch(orderByName(e.target.value));
      setCurrrentPage(1);
      setOrden(`Ordenado ${e.target.value}`);
    }
  }
  function handleOrderByWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div>
      <div className="filter">
        <button
          onClick={(e) => {
            handleClick(e);
          }}
          className="btnRefresh"
        >
          <MdRefresh />
        </button>
        <select
          className="formSelect"
          onChange={(e) => {
            handleOrderByName(e);
          }}
        >
          <option >ALFABET</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <select
          className="formSelect"
          onClick={(e) => {
            handleFilterStatus(e);
          }}
        >
          <option value="all">All</option>
          <option value="exist">Existed</option>
          <option value="created">Created</option>
        </select>
        <select
          className="formSelect"
          onClick={(e) => {
            handleFilterType(e);
          }}
        >
          {types?.map((e) => (
            <option value={e.name}>
              {e.name.replace(e.name.charAt(0), e.name.charAt(0).toUpperCase())}
            </option>
          ))}
        </select>

        <select
          className="formSelect"
          onClick={(e) => {
            handleOrderByWeight(e);
          }}
        >
          <option value="max">Max Weight</option>
          <option value="min">Min Weight</option>
        </select>
      </div>

      <div className="paginate">
        <Paginate
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons.length}
          paginado={paginado}
        />
      </div>

      <div className="listPokemon">
        {isLoadingPokemons ? (
          <ReactLoading
            className="spinner"
            type={"spinningBubbles"}
            color={"#ee9b00"}
            height={"10%"}
            width={"10%"}
          />
        ) : (
          currentPokemons.map((e) => {
            return (
              <div className="card">
                <Link to={`/home/${e.id} `} style={{ textDecoration: "none" }}>
                  <Card
                    name={e.name}
                    imageCard={e.imageCard}
                    types={e.types}
                    key={e.id}
                  />
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

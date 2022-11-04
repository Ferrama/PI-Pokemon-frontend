import "./App.css";
import {  Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import React,{Fragment} from "react";
import PokemonCreate from "./components/PokemonCreate";
import Detail from "./components/Detail";
import Nav from "./components/Nav";
require('dotenv').config()
function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/home/*" element={<Nav />} />
      </Routes>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pokemons" element={<PokemonCreate />} />
        <Route path="/home/:id" element={<Detail />} />
      </Routes>
    </Fragment>
  );
}

export default App;

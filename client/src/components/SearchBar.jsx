import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonName, filterPokemonByTypesSearch } from '../actions';
import "./SearchBar.css"

export default function SearchBar() {

  const dispatch = useDispatch();
  const[name,setName]= useState('')
//  const [type, setType]= useState('')
//   const allPokemons = useSelector((state) => state.pokemons)
//   const types = useSelector((state) => state.types);

 function handleInputChange(e){
     e.preventDefault()
    //  setType(e.target.value)
    setName(e.target.value)
     
     
 }
 function handleSubmit (e){
     e.preventDefault()
     dispatch(getPokemonName(name))
    // dispatch(filterPokemonByTypesSearch(type))
     setName('')
     
 }

    return (
        <div className ='searchBar'>
            <input value={name} id="inputSearch" type='text' placeholder='Search...' onChange={e => handleInputChange(e)}></input>
            <button className="btnSearch"type = 'submit' onClick={e=> handleSubmit(e)}>GO!</button>
        </div>
    )
}

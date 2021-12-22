import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/pokemons");
    
    return dispatch({
      type: "GET_POKEMONS",
      payload: json.data,
    });
  };
}
export function getPokemonName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
      return dispatch({
        type: "GET_POKEMONS_NAME",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}
export function filterPokemonByStatus(payload) {
  //console.log(payload)
  return {
    type: "FILTER_BY_STATUS",
    payload,
  };
}
export function filterPokemonByType(payload) {
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
}
export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}
export function orderByWeight(payload) {
  return {
    type: "ORDER_BY_WEIGHT",
    payload,
  };
}
export function getTypes(name) {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/types`);
    return dispatch({
      type: "GET_TYPES",
      payload: json.data,
    });
  };
}
export function postPokemon(payload) {
  return async function (dispatch) {
    var json = await axios.post(`http://localhost:3001/pokemons`,payload);
    return json
  };
}
export function getDetail(id) {
  return async function (dispatch) {
    try{
    var json = await axios.get(`http://localhost:3001/pokemons/${id}`);
    return dispatch({
      type : "GET_DETAILS",
      payload : json.data,
    })
    } catch(e){
      console.log(e)
    }
  };
  
}
export function filterPokemonByTypesSearch(payload) {
  
  return {
    type: "FILTER_BY_TYPE_SEARCH",
    payload,
  };
}

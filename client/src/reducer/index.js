const inicialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  detail: [],
};

export default function rootReducer(state = inicialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };

    case "GET_POKEMONS_NAME":
      return {
        ...state,
        pokemons: [action.payload],
      };

    case "FILTER_BY_STATUS":
      const allPokemons = state.allPokemons;
      const statusFilter =
        action.payload === "all"
          ? allPokemons
          : allPokemons.filter((e) => e.hasOwnProperty(action.payload));
      return {
        ...state,
        pokemons: statusFilter,
      };

    case "FILTER_BY_TYPE":
      const allPokemons2 = state.allPokemons;
      const statusFilter2 =
        action.payload === "all"
          ? allPokemons2
          : allPokemons2.filter((e) => e.types.includes(action.payload));
      return {
        ...state,
        pokemons: statusFilter2,
      };

    case "ORDER_BY_NAME":
      console.log('reducer ',action.payload)
      let sortedArray =
        action.payload === "asc"
          ? state.pokemons.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              else return 0;
            })
          : state.pokemons.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;
              else return 0;
            });

      return {
        ...state,
        pokemons: sortedArray,
      };

    case "ORDER_BY_WEIGHT":
      let sortedWeight =
        action.payload === "min"
          ? state.pokemons.sort((a, b) => {
              if (a.weight > b.weight) return 1;
              if (a.weight < b.weight) return -1;
              else return 0;
            })
          : state.pokemons.sort((a, b) => {
              if (a.weight > b.weight) return -1;
              if (a.weight < b.weight) return 1;
              else return 0;
            });
      return {
        ...state,
        pokemons: sortedWeight,
      };

    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };

    case "POST_POKEMON":
      return {
        ...state,
      };

    case "GET_DETAILS":
      return {
        ...state,
        detail: [action.payload],
       
      };
      case "FILTER_BY_TYPE_SEARCH":
        console.log(' reducer',action.payload)
       const allPokemons3 = state.allPokemons;
       const statusFilter3 = allPokemons3.filter((e) => e.types.includes(action.payload));
      return {
        ...state,
        pokemons: statusFilter3,
      };
      
    default:
      return state;
  }
}

const axios = require("axios");
const { Pokemons, Types } = require("../db");

const getApiInfo = async () => {
  const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon");
  const apiInfo = await apiUrl.data.results.map((e) => e.url);
  const apiUrlNext1 = await axios.get(apiUrl.data.next);
  const apiUrlNextInfo1 = await apiUrlNext1.data.results.map((e) => e.url);
  const apiUrlNext2 = await axios.get(apiUrlNext1.data.next);
  const apiUrlNextInfo2 = await apiUrlNext2.data.results.map((e) => e.url);
  const apiUrlNext3 = await axios.get(apiUrlNext2.data.next);
  const apiUrlNextInfo3 = await apiUrlNext3.data.results.map((e) => e.url);
  const apiUrlNext4 = await axios.get(apiUrlNext3.data.next);
  const apiUrlNextInfo4 = await apiUrlNext4.data.results.map((e) => e.url);
  const apiUrlNext5 = await axios.get(apiUrlNext4.data.next);
  const apiUrlNextInfo5 = await apiUrlNext5.data.results.map((e) => e.url);

  const arrayLinksPokemons = [
    ...apiInfo,
    ...apiUrlNextInfo1,
    ...apiUrlNextInfo2,
    ...apiUrlNextInfo3,
    ...apiUrlNextInfo4,
    ...apiUrlNextInfo5,
  ];

  const arrayAxiosPokemon = arrayLinksPokemons.map((e) => axios.get(e)); // array de promesas
  const pokemonPromise = await Promise.all(arrayAxiosPokemon);
  const pokemonFilter = pokemonPromise.map((e) => {
    return {
      name: e.data.name,
      id: e.data.id,
      height: e.data.height,
      weight: e.data.weight,
      types: e.data.types.map((e) => e.type.name),
      imageCard:
        e.data.sprites.versions["generation-v"]["black-white"].animated[
          "front_default"
        ],
      imageDetail: e.data.sprites.other["dream_world"]["front_default"],
      baseExp: e.data["base_experience"],
      exist: true,
      hp: e.data.stats[0]["base_stat"],
      attack: e.data.stats[1]["base_stat"],
      defense: e.data.stats[2]["base_stat"],
      speed: e.data.stats[5]["base_stat"],
    };
  });

  return pokemonFilter;
};
getApiInfo();
const getDbInfo = async () => {
  const pokemonDb = await Pokemons.findAll({
    include: {
      model: Types,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });
  const pokemonDbMap = pokemonDb.map((e) => {
    return {
      id: e.dataValues.id,
      name: e.dataValues.name,
      imageCard: e.dataValues.imageCard,
      imageDetail: e.dataValues.imageDetail,
      baseExp: e.dataValues.baseExp,
      height: e.dataValues.height,
      weight: e.dataValues.weight,
      types: e.dataValues.types.map((e) => e.name),
      created: true,
      hp: e.dataValues.hp,
      attack: e.dataValues.attack,
      defense: e.dataValues.defense,
      speed: e.dataValues.speed,
    };
  });

  return pokemonDbMap;
}; // promise trae info db
const getAllPokemons = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const total = [...apiInfo, ...dbInfo];

  return total;
}; //

const getPokemonId = async (id) => {
  const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemonFilter = apiUrl.data;
  const pokemon = {
    name: pokemonFilter.name,
    id: pokemonFilter.id,
    height: pokemonFilter.height,
    weight: pokemonFilter.weight,
    types: pokemonFilter.types.map((e) => e.type.name),
    imageCard:
      pokemonFilter.sprites.versions["generation-v"]["black-white"].animated[
        "front_default"
      ],
    imageDetail: pokemonFilter.sprites.other["dream_world"]["front_default"],
    baseExp: pokemonFilter["base_experience"],
    exist: true,
    hp: pokemonFilter.stats[0]["base_stat"],
    attack: pokemonFilter.stats[1]["base_stat"],
    defense: pokemonFilter.stats[2]["base_stat"],
    speed: pokemonFilter.stats[5]["base_stat"],
  };

  return pokemon;
};

const getDbInfoId = async (id) => {
  const pokemonDb = await Pokemons.findByPk(id, {
    include: Types,
  });

  const pokemonDbDestruc = {
    id: pokemonDb.dataValues.id,
    name: pokemonDb.name,
    imageCard: pokemonDb.imageCard,
    imageDetail: pokemonDb.imageDetail,
    baseExp: pokemonDb.baseExp,
    height: pokemonDb.height,
    weight: pokemonDb.weight,
    types: pokemonDb.types.map((e) => e.name),
    created: true,
    hp: pokemonDb.hp,
    attack: pokemonDb.attack,
    defense: pokemonDb.defense,
    speed: pokemonDb.speed,
  };

  return pokemonDbDestruc;
};

const getAllPokemonsId = async (id) => {
  const idString = id.toString();

  if (idString.length > 6) {
    const dbInfo = await getDbInfoId(id);
    return dbInfo;
  }
  if (idString.length < 6) {
    const apiInfo = await getPokemonId(id);
    return apiInfo;
  }
};

const getPokemonName = async (name) => {
  const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemonFilter = apiUrl.data;

  const pokemon = {
    name: pokemonFilter.name,
    id: pokemonFilter.id,
    height: pokemonFilter.height,
    weight: pokemonFilter.weight,
    types: pokemonFilter.types.map((e) => e.type.name),
    imageCard:
      pokemonFilter.sprites.versions["generation-v"]["black-white"].animated[
        "front_default"
      ],
    imageDetail: pokemonFilter.sprites.other["dream_world"]["front_default"],
    baseExp: pokemonFilter["base_experience"],
    exist: true,
    hp: pokemonFilter.stats[0]["base_stat"],
    attack: pokemonFilter.stats[1]["base_stat"],
    defense: pokemonFilter.stats[2]["base_stat"],
    speed: pokemonFilter.stats[5]["base_stat"],
  };
  return pokemon;
};

const getDbInfoName = async (name) => {
  const pokemonDb = await Pokemons.findAll({
    include: {
      model: Types,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  let pokemonDbFilter = pokemonDb?.filter(
    (e) => e.dataValues.name === `${name}`
  );

  if (pokemonDbFilter.length >= 1) {
    const pokemonDbDestruc = {
      id: pokemonDbFilter[0].dataValues.id,
      name: pokemonDbFilter[0].dataValues.name,
      imageCard: pokemonDbFilter[0].dataValues.imageCard,
      imageDetail: pokemonDbFilter[0].dataValues.imageDetail,
      baseExp: pokemonDbFilter[0].dataValues.baseExp,
      height: pokemonDbFilter[0].dataValues.height,
      weight: pokemonDbFilter[0].dataValues.weight,
      types: pokemonDbFilter[0].dataValues.types.map((e) => e.name),
      created: true,
      hp: pokemonDbFilter[0].dataValues.hp,
      attack: pokemonDbFilter[0].dataValues.attack,
      defense: pokemonDbFilter[0].dataValues.defense,
      speed: pokemonDbFilter[0].dataValues.speed,
    };

    return pokemonDbDestruc;
  } else return false;
};

const getAllPokemonsName = async (name) => {
  const dbInfo = await getDbInfoName(name);

  if (dbInfo === false) {
    const apiInfo = await getPokemonName(name);

    return apiInfo;
  }
  return dbInfo;
};
module.exports = {
  getApiInfo,
  getDbInfo,
  getAllPokemons,
  getPokemonId,
  getDbInfoId,
  getAllPokemonsId,
  getPokemonName,
  getDbInfoName,
  getAllPokemonsName,
};

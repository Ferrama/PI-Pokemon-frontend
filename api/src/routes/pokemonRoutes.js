const { Router } = require("express");

const axios = require("axios");
const { Pokemons, Types } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  getApiInfo,
  getDbInfo,
  getAllPokemons,
  getPokemonId,
  getDbInfoId,
  getAllPokemonsId,
  getPokemonName,
  getDbInfoName,
  getAllPokemonsName,
} = require("../functions.js/index");

const router = Router();

router.get("/", async (req, res, next) => {
  const { name } = req.query;

  try {
    if (name === undefined) {
      let allPokemons = await getAllPokemons();
      res.status(200).json(allPokemons);
    } else if (name) {
      const nameString = name.toString().toLocaleLowerCase();
      const pokemonName = await getAllPokemonsName(nameString);

      res.status(200).json(pokemonName);
    }
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    if (id) {
      const pokemon = await getAllPokemonsId(id);
      res.status(200).json(pokemon);
    }
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  const {
    name,
    imageCard,
    height,
    weight,
    imageDetail,
    baseExp,
    types,
    hp,
    attack,
    defense,
    speed,
  } = req.body;
  const nameString = name.toString().toLocaleLowerCase();
  //crear pokemon
  let newPokemon = await Pokemons.create({
    name: nameString,
    imageCard,
    height,
    weight,
    imageDetail,
    baseExp,
    hp,
    attack,
    defense,
    speed,
  });

  let typesDb = await Types.findAll({
    where: { name: types },
  });
  //console.log(typesDb)
  const typeMap = typesDb.map((e) => e.dataValues.id);

  newPokemon.addTypes(typeMap);
  //agregar tipos al pokemon creado
  res.send(newPokemon);
});

module.exports = router;

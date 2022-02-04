const { Router } = require("express");
const { Types } = require("../db");
const axios = require("axios");

const router = Router();

router.get("/", async (req, res, next) => {
  const apiTypes = await axios.get("https://pokeapi.co/api/v2/type");
  try {
    const apiInfo = await apiTypes.data.results.map((e) => e.name);

    for (const iterator of apiInfo) {
      let [type, creted] = await Types.findOrCreate({
        where: { name: iterator },
      });
    }

    const allTypes = await Types.findAll();
    res.json(allTypes);
  } catch (e) {
    next(e);
  }
});
module.exports = router;

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const STRING = DataTypes.STRING;
const UUID =  DataTypes.UUID;
const UUIDV4 = DataTypes.UUIDV4;
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('types', {
    id:{
      type: UUID,
      allowNull :false,
      primaryKey :true,
      defaultValue : UUIDV4,
      },
      name: {
        type: STRING ,
        allowNull: false,
      },
  });
};

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  const Liga = sequelize.define('Liga', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    pais: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })
  return Liga;
};


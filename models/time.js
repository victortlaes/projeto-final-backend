const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  const Time = sequelize.define('Time', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    regiao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantidadeTorcedores: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ligaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ligas', 
        key: 'id',
      },
      allowNull: false,
    },
  });

  return Time;
};

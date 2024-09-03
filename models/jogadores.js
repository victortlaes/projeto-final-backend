const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Jogadores = sequelize.define('Jogadores', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posicao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    perna: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'times', 
        key: 'id',
      },
      allowNull: false,
    },
  });

  return Jogadores;
};


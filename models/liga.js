const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  const Liga = sequelize.define('Liga', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pais: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })
  return Liga;
};


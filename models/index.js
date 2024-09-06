const path = require('path');
const fs = require('fs');
const { Sequelize } = require('sequelize');
const basename = path.basename(__filename);

const sequelize = new Sequelize('projeto-final-backend', 'root', 'tlaes383', {
  host: 'localhost',
  dialect: 'mysql',
});

const db = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

//fazer associações
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

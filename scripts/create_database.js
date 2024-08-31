const { Sequelize, DataTypes } = require('sequelize');

// Conectando ao MySQL sem especificar um banco de dados
const sequelize = new Sequelize('mysql://root:tlaes383@localhost:3306');

const createDatabaseAndTable = async () => {
  try {
    // Cria o banco de dados se não existir
    await sequelize.query('CREATE DATABASE IF NOT EXISTS `projeto-final-backend`');
    console.log('Banco de dados criado com sucesso.');

    // Reconfigura o Sequelize para usar o banco de dados criado
    const sequelizeWithDB = new Sequelize('projeto-final-backend', 'root', 'tlaes383', {
      host: '127.0.0.1',
      dialect: 'mysql'
    });

    // Tabela users
    const Users = sequelizeWithDB.define('Users', {
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      createdAt:{
        type:DataTypes.STRING,
        defaultValue:0
      },
      updatedAt:{
        type:DataTypes.STRING,
        defaultValue:0
      }
    }, {
      tableName: 'users',
      timestamps: false
    });

    // Cria a tabela se não existir
    await Users.sync({force:true});
    console.log('Tabela `users` criada com sucesso.');

  } catch (error) {
    console.error('Erro ao criar o banco de dados ou a tabela:', error);
  } finally {
    await sequelize.close();
  }
};

createDatabaseAndTable();

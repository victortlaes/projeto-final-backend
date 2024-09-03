const { Sequelize, DataTypes } = require('sequelize');

// Conectando ao MySQL sem especificar um banco de dados
const sequelize = new Sequelize('mysql://root:tlaes383@localhost:3306');

// Função para criar o banco de dados e a tabela Jogadores
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

    // Define o modelo Liga
    const Liga = sequelizeWithDB.define('Liga', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pais: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    // Define o modelo Time
    const Time = sequelizeWithDB.define('Time', {
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
          model: Liga, // Nome do modelo que é referenciado
          key: 'id', // Chave primária do modelo referenciado
        },
      },
    });

    // Define o modelo Jogadores com relacionamento com Time
    const Jogadores = sequelizeWithDB.define('Jogadores', {
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
          model: Time, // Nome do modelo que é referenciado
          key: 'id', // Chave primária do modelo referenciado
        },
      },
    });

    // Define as associações
    Liga.hasMany(Time, { foreignKey: 'ligaId' });
    Time.belongsTo(Liga, { foreignKey: 'ligaId' });
    Time.hasMany(Jogadores, { foreignKey: 'timeId' });
    Jogadores.belongsTo(Time, { foreignKey: 'timeId' });

    // Sincroniza os modelos e cria as tabelas se não existirem
    await sequelizeWithDB.sync({ force: true });
    console.log('Tabela `jogadores` criada com sucesso.');

  } catch (error) {
    console.error('Erro ao criar o banco de dados ou a tabela:', error);
  } finally {
    await sequelize.close();
  }
};

createDatabaseAndTable();

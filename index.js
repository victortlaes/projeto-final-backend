const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');
const mustacheExpress = require('mustache-express');
const path = require('path');
const userRoutes = require('./routes/user');
const PORT = 3000;

//Chamando mustache na pasta views
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

// Rotas de usuário
app.use('/api', userRoutes);


// Conectando com o banco de dados
const sequelize = new Sequelize('projetobackend', 'root', 'tlaes383', {
  host: 'localhost',
  dialect: 'mysql'
});

// Conexao Sequelize
sequelize.authenticate()
  .then(() => console.log('Conectou com o banco de dados'))
  .catch(err => console.error('Não conectou ao banco de dados', err));

sequelize.sync();

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});


// Servidor rodando
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

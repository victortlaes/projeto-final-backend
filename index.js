const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const app = express();
const userRoutes = require('./routes/user');
const crudRoutes = require('./routes/crud');
require('./config/passport-config')(passport);  
const { sequelize } = require('./models');


app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(session({
  secret: 'senhasecreta',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

 
// Rotas
app.use('/', userRoutes);
app.use('/', crudRoutes);

//pagina inicial
app.get('/', (req, res) => {
  res.render('index', {
    isAdmin: req.user.isAdmin,
    user: req.user.username
  });
});

//sincroniza o banco de dados e inicia o servidor
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log(`Servidor rodando na porta ${3000}`);
  });
}).catch(error => {
  console.error('Erro ao sincronizar o banco de dados:', error);
});

const express = require('express');
const router = express.Router();
const { User } = require('../models'); 
const passport = require('passport');
const bcrypt = require('bcryptjs');


// middleware verificar se o usuario é admin
const checkAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }
  res.status(403).json({ error: 'Acesso negado' });
};

// cadastro usuário
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: "Username e password são obrigatórios" });
    }

    // hash senha com bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, password: hashedPassword });

    res.json({ message: 'Registro bem-sucedido', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// login user usando passport como middleware
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Erro de autenticação' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao fazer login' });
      }
      const isAdmin = user.isAdmin ? true : false;
      return res.json({ message: 'Login bem-sucedido', isAdmin });
    });
  })(req, res, next);
});


// rota admin
router.get('/admin', checkAdmin, (req, res) => {
  res.json({ message: 'Bem-vindo, admin', user: req.user });
});

// rota para ver usuarios
router.get('/admin/users', checkAdmin, async (req, res) => {
  try {
    //encontrar usuarios do banco
    const users = await User.findAll(); 
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// rota para admin criar admin
router.post('/admin/create-admin', checkAdmin, async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword, isAdmin: 1 });
    res.json({ message: 'Admin criado com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao fazer logout' });
    }
    res.json({ message: 'Logout bem-sucedido' });
  });
});

module.exports = router;

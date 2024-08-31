const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Cadastro
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.status(201).json({ message: 'Usuário registrado com sucesso', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, 'senhasecreta', { expiresIn: '1h' });
    res.json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Middleware JWT
const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Acesso negado' });

  try {
    const verified = jwt.verify(token, 'senhasecreta');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido' });
  }
};

// Rota para criar admin
router.post('/admin', auth, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Acesso negado' });
  }
  try {
    const { username, password } = req.body;
    const admin = await User.create({ username, password, isAdmin: true });
    res.status(201).json({ message: 'Admin criado', admin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

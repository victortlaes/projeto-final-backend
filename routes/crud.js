const express = require('express');
const router = express.Router();
const { Liga, Time, Jogadores } = require('../models');
const ensureAuthenticated = require('../middleware/auth')

//middleware
router.use(ensureAuthenticated);

//rotas liga
router.get('/liga', async (req, res) => {
  const ligas = await Liga.findAll();
  res.json(ligas);
});

router.post('/liga', async (req, res) => {
  const { pais } = req.body;
  const novaLiga = await Liga.create({ pais });
  res.json(novaLiga);
});

router.put('/liga/:id', async (req, res) => {
  const { id } = req.params;
  const { pais } = req.body;
  const liga = await Liga.findByPk(id);
  if (liga) {
    liga.pais = pais;
    await liga.save();
    res.json(liga);
  } else {
    res.status(404).json({ error: 'Liga não encontrada' });
  }
});

router.delete('/liga/:id', async (req, res) => {
  const { id } = req.params;
  const liga = await Liga.findByPk(id);
  if (liga) {
    await liga.destroy();
    res.json({ message: 'Liga deletada' });
  } else {
    res.status(404).json({ error: 'Liga não encontrada' });
  }
});

//rotas time
router.get('/time', async (req, res) => {
  const times = await Time.findAll();
  res.json(times);
});

router.post('/time', async (req, res) => {
  const { nome, regiao, quantidadeTorcedores } = req.body;
  const novoTime = await Time.create({ nome, regiao, quantidadeTorcedores });
  res.json(novoTime);
});

router.put('/time/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, regiao, quantidadeTorcedores } = req.body;
  const time = await Time.findByPk(id);
  if (time) {
    time.nome = nome;
    time.regiao = regiao;
    time.quantidadeTorcedores = quantidadeTorcedores;
    await time.save();
    res.json(time);
  } else {
    res.status(404).json({ error: 'Time não encontrado' });
  }
});

router.delete('/time/:id', async (req, res) => {
  const { id } = req.params;
  const time = await Time.findByPk(id);
  if (time) {
    await time.destroy();
    res.json({ message: 'Time deletado' });
  } else {
    res.status(404).json({ error: 'Time não encontrado' });
  }
});

//rotas jogadores
router.get('/jogadores', async (req, res) => {
  const jogadores = await Jogadores.findAll();
  res.json(jogadores);
});

router.post('/jogadores', async (req, res) => {
  const { nome, posicao, perna, idade } = req.body;
  const novoJogador = await Jogadores.create({ nome, posicao, perna, idade });
  res.json(novoJogador);
});

router.put('/jogadores/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, posicao, perna, idade } = req.body;
  const jogador = await Jogadores.findByPk(id);
  if (jogador) {
    jogador.nome = nome;
    jogador.posicao = posicao;
    jogador.perna = perna;
    jogador.idade = idade;
    await jogador.save();
    res.json(jogador);
  } else {
    res.status(404).json({ error: 'Jogador não encontrado' });
  }
});

router.delete('/jogadores/:id', async (req, res) => {
  const { id } = req.params;
  const jogador = await Jogadores.findByPk(id);
  if (jogador) {
    await jogador.destroy();
    res.json({ message: 'Jogador deletado' });
  } else {
    res.status(404).json({ error: 'Jogador não encontrado' });
  }
});

module.exports = router;

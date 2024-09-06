const express = require('express');
const router = express.Router();
const { Liga, Time, Jogadores, User } = require('../models');
const bcrypt = require('bcryptjs');

//rota para  inserção de dados
router.get('/', async (req, res) => {
  try {
    //ligas
    const ligas = [
      { id: 1, nome: 'Premier League', pais: 'Inglaterra' },
      { id: 2, nome: 'La Liga', pais: 'Espanha' },
      { id: 3, nome: 'Brasileirão', pais: 'Brasil' },
      { id: 4, nome: 'Ligue 1', pais: 'França' },
      { id: 5, nome: 'Bundesliga', pais: 'Alemanha' }
    ];
    await Liga.bulkCreate(ligas, { updateOnDuplicate: ['nome', 'pais'] });

    //times
    const times = [
      { id: 1, nome: 'Manchester United', regiao: 'Manchester', quantidadeTorcedores: 1000000, ligaId: 1 },
      { id: 2, nome: 'Liverpool', regiao: 'Liverpool', quantidadeTorcedores: 1000000, ligaId: 1 },
      { id: 3, nome: 'Real Madrid', regiao: 'Madrid', quantidadeTorcedores: 5000000, ligaId: 2 },
      { id: 4, nome: 'Barcelona', regiao: 'Catalunha', quantidadeTorcedores: 4000000, ligaId: 2 },
      { id: 5, nome: 'Flamengo', regiao: 'Rio de Janeiro', quantidadeTorcedores: 5000000, ligaId: 3 },
      { id: 6, nome: 'São Paulo', regiao: 'São Paulo', quantidadeTorcedores: 2000000, ligaId: 3 },
      { id: 7, nome: 'PSG', regiao: 'Paris', quantidadeTorcedores: 2000000, ligaId: 4 },
      { id: 8, nome: 'Monaco', regiao: 'Monaco', quantidadeTorcedores: 1000000, ligaId: 4 },
      { id: 9, nome: 'Bayern Munich', regiao: 'Munique', quantidadeTorcedores: 2000000, ligaId: 5 },
      { id: 10, nome: 'Borussia Dortmund', regiao: 'Dortmund', quantidadeTorcedores: 2000000, ligaId: 5 }
    ];
    await Time.bulkCreate(times, { updateOnDuplicate: ['nome', 'regiao', 'quantidadeTorcedores', 'ligaId'] });

    //jogadores
    const jogadores = [
      { id: 1, nome: 'Bruno Fernandes', posicao: 'MEI', perna: 'D', idade: 30, timeId: 1 },
      { id: 2, nome: 'Mohamed Salah', posicao: 'ATA', perna: 'D', idade: 30, timeId: 2 },
      { id: 3, nome: 'Vinicius Junior', posicao: 'ATA', perna: 'D', idade: 24, timeId: 3 },
      { id: 4, nome: 'Lamine Yamal', posicao: 'ATA', perna: 'E', idade: 17, timeId: 4 },
      { id: 5, nome: 'Robert Lewandowski', posicao: 'ATA', perna: 'D', idade: 34, timeId: 4 },
      { id: 6, nome: 'Virgil van Dijk', posicao: 'ZAG', perna: 'D', idade: 30, timeId: 2 },
      { id: 7, nome: 'Jonathan Calleri', posicao: 'ATA', perna: 'D', idade: 30, timeId: 6 },
      { id: 8, nome: 'Lucas Moura', posicao: 'ATA', perna: 'D', idade: 30, timeId: 6 },
      { id: 9, nome: 'Kylian Mbappé', posicao: 'ATA', perna: 'D', idade: 24, timeId: 3 },
      { id: 10, nome: 'Gabriel Barbosa', posicao: 'ATA', perna: 'D', idade: 28, timeId: 5 },
      { id: 11, nome: 'Ousmane Dembelé', posicao: 'ATA', perna: 'D', idade: 25, timeId: 7 },
      { id: 12, nome: 'Luka Modric', posicao: 'ATA', perna: 'D', idade: 38, timeId: 3 },
      { id: 13, nome: 'Vanderson', posicao: 'LD', perna: 'D', idade: 22, timeId: 8 },
      { id: 14, nome: 'Endrick', posicao: 'ATA', perna: 'D', idade: 18, timeId: 3 },
      { id: 15, nome: 'Giorgian de Arrascaeta', posicao: 'MEI', perna: 'D', idade: 29, timeId: 5 },
      { id: 16, nome: 'Ferreirinha', posicao: 'ATA', perna: 'D', idade: 26, timeId: 6 },
      { id: 17, nome: 'Rodrygo', posicao: 'ATA', perna: 'D', idade: 25, timeId: 3 },
      { id: 18, nome: 'Julian Brandt', posicao: 'MEI', perna: 'D', idade: 27, timeId: 10 },
      { id: 19, nome: 'Thomas Muller', posicao: 'ATA', perna: 'D', idade: 34, timeId: 9 },
      { id: 20, nome: 'Joshua Kimmich', posicao: 'MEI', perna: 'D', idade: 28, timeId: 9 }
    ];
    await Jogadores.bulkCreate(jogadores, { updateOnDuplicate: ['nome', 'posicao', 'perna', 'idade', 'timeId'] });

    //users
    const users = [
      { id: 1, username: 'admin', password: 'senha', isAdmin: true },
      { id: 2, username: 'user1', password: 'senha1' },
      { id: 3, username: 'user2', password: 'senha2' },
      { id: 4, username: 'user3', password: 'senha3' },
      { id: 5, username: 'user4', password: 'senha4' }
    ];

    //hash das senhas
    for (let user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    await User.bulkCreate(users, { updateOnDuplicate: ['username', 'password', 'isAdmin'] });

    res.json({ message: 'BD populado com sucesso!' });
  } catch (error) {
    console.error('Erro ao popular o BD:', error);
    res.status(500).json({ error: 'Erro ao popular o BD' });
  }
});

module.exports = router;

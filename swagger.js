const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const express = require('express');
const app = express();

//config swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST para Controle de Times de Futebol',
      version: '1.0.0',
      description: 'API REST para gerenciamento de ligas, times e jogadores de futebol.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

//documentaçao
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

module.exports = app;
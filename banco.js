//para integrar banco de dados:
//npm install --save sequelize

//para utilizar mysql
//npm install -s mysql2@3.0.0

require('dotenv').config();
const Sequelize = require('sequelize');

const banco = new Sequelize(
  process.env.MSQLDBAS,
  {
    host: process.env.MSQLHOST,
    dialect: 'mysql',
  }
);

banco
  .authenticate()
  .then(console.log(`Conectado com sucesso!`))
  .catch(function (err) {
    console.log(`Falha ao conectar ao banco de dados: ` + err);
  });

module.exports = banco;

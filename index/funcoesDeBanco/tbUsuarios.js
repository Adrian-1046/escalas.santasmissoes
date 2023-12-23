const Sequelize = require('sequelize');
const banco = require('../../banco');

const tbUsuarios = banco.define(
  'USUARIOS',
  {
    ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    USUARIO: Sequelize.STRING,
    SENHA: Sequelize.STRING,
    ACESSO: Sequelize.STRING,
    TELEFONE: Sequelize.STRING,
    EMAIL: Sequelize.STRING,
    CARGO: Sequelize.STRING,
    DATA_CADASTRO: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: true,
    },
    ATIVO: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    },
  },
  {
    tableName: 'USUARIOS',
    timestamps: false,
  }
);

module.exports = tbUsuarios;

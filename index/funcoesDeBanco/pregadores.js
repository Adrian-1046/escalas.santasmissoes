const Sequelize = require('sequelize');
const banco = require('./../../banco');

const pregar = banco.define(
  'PREGADORES',
  {
    ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TELA: Sequelize.STRING,
    S1_DATA: Sequelize.STRING,
    S1_PREGADOR: Sequelize.STRING,
    S2_DATA: Sequelize.STRING,
    S2_PREGADOR: Sequelize.STRING,
    S3_DATA: Sequelize.STRING,
    S3_PREGADOR: Sequelize.STRING,
    S4_DATA: Sequelize.STRING,
    S4_PREGADOR: Sequelize.STRING,
    S5_DATA: Sequelize.STRING,
    S5_PREGADOR: Sequelize.STRING,
  },
  {
    tableName: 'PREGADORES',
    timestamps: false,
  }
);

module.exports = pregar;

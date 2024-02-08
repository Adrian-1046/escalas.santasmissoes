const Sequelize = require('sequelize');
const banco = require('./../../banco');

const recepcionar = banco.define(
  'RECEPCIONISTAS',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TELA: Sequelize.STRING,
    S1_DATA: Sequelize.STRING,
    S1_RECEPCIONISTA: Sequelize.STRING,
    S2_DATA: Sequelize.STRING,
    S2_RECEPCIONISTA: Sequelize.STRING,
    S3_DATA: Sequelize.STRING,
    S3_RECEPCIONISTA: Sequelize.STRING,
    S4_DATA: Sequelize.STRING,
    S4_RECEPCIONISTA: Sequelize.STRING,
    S5_DATA: Sequelize.STRING,
    S5_RECEPCIONISTA: Sequelize.STRING,
  },
  {
    tableName: 'RECEPCIONISTAS',
    timestamps: false,
  }
);

module.exports = recepcionar;

const Sequelize = require('sequelize');
const banco = require('./../../banco');

const ministrar = banco.define(
  'MINISTRANTES',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TELA: Sequelize.STRING,
    S1_DATA: Sequelize.STRING,
    S1_MINISTRANTE: Sequelize.STRING,
    S1_MUSICA: Sequelize.STRING,
    S2_DATA: Sequelize.STRING,
    S2_MINISTRANTE: Sequelize.STRING,
    S2_MUSICA: Sequelize.STRING,
    S3_DATA: Sequelize.STRING,
    S3_MINISTRANTE: Sequelize.STRING,
    S3_MUSICA: Sequelize.STRING,
    S4_DATA: Sequelize.STRING,
    S4_MINISTRANTE: Sequelize.STRING,
    S4_MUSICA: Sequelize.STRING,
    S5_DATA: Sequelize.STRING,
    S5_MINISTRANTE: Sequelize.STRING,
    S5_MUSICA: Sequelize.STRING,
  },
  {
    tableName: 'MINISTRANTES',
    timestamps: false,
  }
);
module.exports = ministrar;

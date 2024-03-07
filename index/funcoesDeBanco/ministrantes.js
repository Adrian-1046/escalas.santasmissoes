const Sequelize = require('sequelize');
const banco = require('./../../banco');

const ministrar = banco.define(
  'MUSICAS',
  {
    ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    'DATA-DM': {
      type: Sequelize.STRING,
      field: 'DATA-DM',
    },
    'MINISTRANTE-DM': {
      type: Sequelize.STRING,
      field: 'MINISTRANTE-DM',
    },
    'MUSICA-DM': {
      type: Sequelize.STRING,
      field: 'MUSICA-DM',
    },
    'LINK-DM': {
      type: Sequelize.STRING,
      field: 'LINK-DM',
    },
    'OBS-DM': {
      type: Sequelize.STRING,
      field: 'OBS-DM',
    },
    'DATA-DN': {
      type: Sequelize.STRING,
      field: 'DATA-DN',
    },
    'MINISTRANTE-DN': {
      type: Sequelize.STRING,
      field: 'MINISTRANTE-DN',
    },
    'MUSICA-DN': {
      type: Sequelize.STRING,
      field: 'MUSICA-DN',
    },
    'LINK-DN': {
      type: Sequelize.STRING,
      field: 'LINK-DN',
    },
    'OBS-DN': {
      type: Sequelize.STRING,
      field: 'OBS-DN',
    },
    'DATA-T': {
      type: Sequelize.STRING,
      field: 'DATA-T',
    },
    'MINISTRANTE-T': {
      type: Sequelize.STRING,
      field: 'MINISTRANTE-T',
    },
    'MUSICA-T': {
      type: Sequelize.STRING,
      field: 'MUSICA-T',
    },
    'LINK-T': {
      type: Sequelize.STRING,
      field: 'LINK-T',
    },
    'OBS-T': {
      type: Sequelize.STRING,
      field: 'OBS-T',
    },
    'DATA-Q': {
      type: Sequelize.STRING,
      field: 'DATA-Q',
    },
    'MINISTRANTE-Q': {
      type: Sequelize.STRING,
      field: 'MINISTRANTE-Q',
    },
    'MUSICA-Q': {
      type: Sequelize.STRING,
      field: 'MUSICA-Q',
    },
    'LINK-Q': {
      type: Sequelize.STRING,
      field: 'LINK-Q',
    },
    'OBS-Q': {
      type: Sequelize.STRING,
      field: 'OBS-Q',
    },
  },
  {
    tableName: 'MUSICAS',
    timestamps: false,
  }
);
module.exports = ministrar;

const Sequelize = require('sequelize');
const banco = require('./../../banco');



const ministrantes = banco.define(
  'MINISTRANTES',
  {
    'MINISTRANTE-DM': {
      type: Sequelize.STRING,
      field: 'MINISTRANTE-DM',
    },

    'MINISTRANTE-DN': {
      type: Sequelize.STRING,
      field: 'MINISTRANTE-DN',
    },

    'MINISTRANTE-T': {
      type: Sequelize.STRING,
      field: 'MINISTRANTE-T',
    },

    'MINISTRANTE-Q': {
      type: Sequelize.STRING,
      field: 'MINISTRANTE-Q',
    },
  },
  {
    tableName: 'MUSICAS',
    timestamps: false,
  }
);
module.exports = ministrantes;

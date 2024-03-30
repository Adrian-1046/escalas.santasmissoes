const Sequelize = require('sequelize');
const banco = require('../../banco');



const ministrantes = banco.define(
  'MINISTRANTES_Q',
  {
    'DATA_S1': {
      type: Sequelize.STRING,
      field: 'DATA_S1',
    },

    'MINISTRANTE_S1': {
      type: Sequelize.STRING,
      field: 'MINISTRANTE_S1',
    },

    'DATA_S2': {
      type: Sequelize.STRING,
      field: 'DATA_S2',
    },

    'MINISTRANTE_S2': {
      type: Sequelize.STRING,
      field: 'MINISTRANTE_S2',
    },

    'DATA_S3': {
      type: Sequelize.STRING,
      field: 'DATA_S3',
    },

    'MINISTRANTE_S3': {
      type: Sequelize.STRING,
      field: 'MINISTRANTE_S3',
    },

    'DATA_S4': {
      type: Sequelize.STRING,
      field: 'DATA_S4',
    },

    'MINISTRANTE_S4': {
      type: Sequelize.STRING,
      field: 'MINISTRANTE_S4',
    },

    'DATA_S5': {
      type: Sequelize.STRING,
      field: 'DATA_S5',
    },

    'MINISTRANTE_S5': {
      type: Sequelize.STRING,
      field: 'MINISTRANTE_S5',
    },
  },
  {
    tableName: 'MINISTRANTES_Q',
    timestamps: false,
  }
);
module.exports = ministrantes;

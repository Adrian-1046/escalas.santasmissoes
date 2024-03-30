const Sequelize = require('sequelize');
const banco = require('../../banco');



const datas = banco.define(
  'DATAS',
  {
    'DOMINGO-M': {
      type: Sequelize.STRING,
      field:  'DOMINGO-M',
    },
    'DOMINGO-N': {
      type: Sequelize.STRING,
      field: 'DOMINGO-N',
    },
    'TERCA': {
      type: Sequelize.STRING,
      field: 'TERCA',
    },
    'QUARTA': {
        type: Sequelize.STRING,
        field: 'QUARTA',
      },
  },
  {
    tableName: 'DATAS',
    timestamps: false,
  }
);
module.exports = datas;

const Sequelize = require('sequelize');
const banco = require('../../banco');

const musicas_q = banco.define(
  'MUSICAS-Q',
  {
    'MUSICA': {
      type: Sequelize.STRING,
      field: 'MUSICA',
      primaryKey: true, 
    },
    'LINK': {
      type: Sequelize.STRING,
      field: 'LINK',
    },
    'OBS': {
      type: Sequelize.STRING,
      field: 'OBS',
    },
  },
  {
    tableName: 'MUSICAS-Q',
    timestamps: false,
    freezeTableName: true, 
  }
);

module.exports = musicas_q;

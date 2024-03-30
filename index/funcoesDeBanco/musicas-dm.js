const Sequelize = require('sequelize');
const banco = require('../../banco');

const musicas_dm = banco.define(
  'MUSICAS-DM',
  {
    'DATA': {
      type: Sequelize.STRING,
      field: 'DATA',
    },
    'MINISTRO': {
      type: Sequelize.STRING,
      field: 'MINISTRO',
    },
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
    tableName: 'MUSICAS-DM',
    timestamps: false,
    freezeTableName: true, 
  }
);

module.exports = musicas_dm;

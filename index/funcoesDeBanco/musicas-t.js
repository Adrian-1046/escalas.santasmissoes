const Sequelize = require('sequelize');
const banco = require('../../banco');

const musicas_t = banco.define(
  'MUSICAS-T',
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
    tableName: 'MUSICAS-T',
    timestamps: false,
    freezeTableName: true, 
  }
);

module.exports = musicas_t;

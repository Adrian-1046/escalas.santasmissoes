const Sequelize = require('sequelize');
const banco = require('./../../banco');

const sugerir = banco.define(
  'SUGESTOES',
  {
    ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ID_USUARIO: Sequelize.INTEGER,
    USUARIO: Sequelize.STRING,
    SUGESTAO: Sequelize.STRING,
    DATA: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: true,
    },
  },
  {
    tableName: 'SUGESTOES',
    timestamps: false,
  }
);
module.exports = sugerir;

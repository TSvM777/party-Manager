'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Debtor extends Model {
    static associate({User, Zakup}) {
      Debtor.belongsTo(User, {
        foreignKey: 'user_id',
      });
      Debtor.belongsTo(Zakup, {
        foreignKey: 'zakup_id',
      });
    }
  }
  Debtor.init({
    user_id: DataTypes.INTEGER,
    zakup_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Debtor',
  });
  return Debtor;
};
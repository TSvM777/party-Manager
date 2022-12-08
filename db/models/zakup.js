'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Zakup extends Model {
    static associate({User, Party, Debtor}) {
      Zakup.belongsTo(User, {
        foreignKey: 'user_id',
      });
      Zakup.belongsTo(Party, {
        foreignKey: 'party_id',
      })
      Zakup.hasMany(Debtor, {
        foreignKey: 'zakup_id',
      });
    }
  }
  Zakup.init({
    item: DataTypes.STRING,
    sum: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    party_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Zakup',
  });
  return Zakup;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserParty extends Model {
    static associate({User, Party}) {
      UserParty.belongsTo(User, {
        foreignKey: 'user_id',
      });
      UserParty.belongsTo(Party, {
        foreignKey: 'party_id',
      })
    }
  }
  UserParty.init({
    user_id: DataTypes.INTEGER,
    party_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserParty',
  });
  return UserParty;
};
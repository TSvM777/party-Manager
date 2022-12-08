'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({Party, Zakup, Debtor, UserParty}) {
      User.hasMany(Party, {
        foreignKey: 'user_id',
      });
      User.hasMany(Zakup, {
        foreignKey: 'user_id',
      });
      User.hasMany(Debtor, {
        foreignKey: 'user_id',
      });
      User.hasMany(UserParty, {
        foreignKey: 'user_id',
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
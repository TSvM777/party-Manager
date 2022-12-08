'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Party extends Model {
    static associate({User, UserParty, Zakup}) {
      Party.belongsTo(User, {
        foreignKey: 'user_id',
      });
      Party.hasMany(UserParty, {
        foreignKey: 'party_id',
      });
      Party.hasMany(Zakup, {
        foreignKey: 'party_id',
      });
    }
  }
  Party.init({
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    place: DataTypes.STRING,
    code: DataTypes.STRING,
    clothes: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Party',
  });
  return Party;
};
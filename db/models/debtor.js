'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Debtor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
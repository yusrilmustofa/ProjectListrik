'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tarif extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tarif.init({
    id_tarif:{
      type:DataTypes.INTEGER,
      allowNull:true,
      autoIncrement:true,
      primaryKey:true
    },
    daya: DataTypes.STRING,
    tarifperKwh: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'tarif',
    tableName: 'tarif'
  });
  return tarif;
};

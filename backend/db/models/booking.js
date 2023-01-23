'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.User, {
        foreignKey:"userId"
      })
      Booking.belongsTo(models.Spot, {
        foreignKey:"spotId"
      })
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId:  {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate:  {
      type: DataTypes.DATE,
      allowNull: false,
      validate:{
        isDate: true,
        isAfter: Date.now()
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate:{
        isDate: true,
        isAfter: Date.now()
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
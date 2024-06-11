"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShareRateUpdate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ShareRateUpdate.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      shareId: {
        allowNull: false,
        references: {
          model: "shares",
          key: "id",
        },
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        type: DataTypes.INTEGER,
      },
      isSystemUpdate: DataTypes.BOOLEAN,
      rate: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
      },
      date: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
    },
    {
      sequelize,
      modelName: "ShareRateUpdate",
    }
  );
  return ShareRateUpdate;
};

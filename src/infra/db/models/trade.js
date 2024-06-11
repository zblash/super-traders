"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Trade.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      portfolioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "portfolios",
          key: "id",
        },
      },
      shareId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "shares",
          key: "id",
        },
      },
      rate: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(...Object.values(TradeType)),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Trade",
    }
  );
  return Trade;
};

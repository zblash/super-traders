"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PortfolioShareItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PortfolioShareItem.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      shareId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "shares",
          key: "id",
        },
      },
      portfolioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "shares",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PortfolioShareItem",
    }
  );
  return PortfolioShareItem;
};

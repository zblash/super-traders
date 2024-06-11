import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import PortfolioShareItemModel from "./portfolioshareitem";

interface PortfolioAttributes {
  id: number;
  name: string;
  userId: number;
}

interface PortfolioCreationAttributes
  extends Optional<PortfolioAttributes, "id"> {}

export interface PortfolioInstance
  extends Model<PortfolioAttributes, PortfolioCreationAttributes>,
    PortfolioAttributes {}

const PortfolioModel = sequelize.define<PortfolioInstance>("Portfolio", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
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
});

PortfolioModel.hasMany(PortfolioShareItemModel, {
  foreignKey: "portfolioId",
  sourceKey: "id",
  as: "shareItems",
});

export default PortfolioModel;

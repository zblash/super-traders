import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import ShareModel from "./share";
import PortfolioModel from "./portfolio";

interface PortfolioShareItemAttributes {
  id: number;
  shareId: number;
  portfolioId: number;
  quantity: number;
}

interface PortfolioShareItemCreationAttributes
  extends Optional<PortfolioShareItemAttributes, "id"> {}

export interface PortfolioShareItemInstance
  extends Model<
      PortfolioShareItemAttributes,
      PortfolioShareItemCreationAttributes
    >,
    PortfolioShareItemAttributes {}

const PortfolioShareItemModel = sequelize.define<PortfolioShareItemInstance>(
  "PortfolioShareItem",
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
  }
);

PortfolioShareItemModel.belongsTo(ShareModel, {
  foreignKey: "shareId",
});

PortfolioShareItemModel.belongsTo(PortfolioModel, {
  foreignKey: "portfolioId",
});

export default PortfolioShareItemModel;

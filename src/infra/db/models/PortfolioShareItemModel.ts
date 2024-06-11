import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";

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
        model: "Share",
        key: "id",
      },
    },
    portfolioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Portfolio",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "portfolioShareItems",
  }
);

export default PortfolioShareItemModel;

import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import { TradeType } from "../../../domain/trade/model/TradeType";
import UserModel from "./user";

interface TradeModelAttributes {
  id: number;
  date: number;
  userId: number;
  portfolioId: number;
  shareId: number;
  rate: number;
  quantity: number;
  type: TradeType;
}

interface TradeModelCreationAttributes
  extends Optional<TradeModelAttributes, "id"> {}

export interface TradeInstance
  extends Model<TradeModelAttributes, TradeModelCreationAttributes>,
    TradeModelAttributes {}

const TradeModel = sequelize.define<TradeInstance>("Trade", {
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
});

TradeModel.belongsTo(UserModel, {
  foreignKey: "userId",
});

TradeModel.belongsTo(sequelize.models.Portfolio, {
  foreignKey: "portfolioId",
});

TradeModel.belongsTo(sequelize.models.Share, {
  foreignKey: "shareId",
});

export default TradeModel;

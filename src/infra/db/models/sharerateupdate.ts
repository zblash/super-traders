import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";

interface ShareRateUpdateModelAttributes {
  id: number;
  shareId: number;
  userId: number;
  isSystemUpdate: boolean;
  rate: number;
  date: number;
}

interface ShareRateUpdateModelCreationAttributes
  extends Optional<ShareRateUpdateModelAttributes, "id"> {}

export interface ShareRateUpdateInstance
  extends Model<
      ShareRateUpdateModelAttributes,
      ShareRateUpdateModelCreationAttributes
    >,
    ShareRateUpdateModelAttributes {}

const ShareRateUpdateModel = sequelize.define<ShareRateUpdateInstance>(
  "ShareRateUpdate",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    shareId: {
      allowNull: false,
      references: {
        model: "Share",
        key: "id",
      },
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: true,
      references: {
        model: "User",
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
    timestamps: false,
    tableName: "shareRateUpdates",
  }
);


export default ShareRateUpdateModel;

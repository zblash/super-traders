import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import ShareRateUpdateModel from "./sharerateupdate";

interface ShareModelAttributes {
  id: number;
  symbol: string;
}

interface ShareModelCreationAttributes
  extends Optional<ShareModelAttributes, "id"> {}

export interface ShareInstance
  extends Model<ShareModelAttributes, ShareModelCreationAttributes>,
    ShareModelAttributes {}

const ShareModel = sequelize.define<ShareInstance>("Share", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

ShareModel.hasMany(ShareRateUpdateModel, {
  foreignKey: "shareId",
  sourceKey: "id",
  as: "shareRateUpdates",
});

export default ShareModel;

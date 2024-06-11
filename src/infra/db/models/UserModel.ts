import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import ShareRateUpdateModel from "./ShareRateUpdate";

interface UserModelAttributes {
  id: number;
  name: string;
  email: string;
}

interface UserModelCreationAttributes
  extends Optional<UserModelAttributes, "id"> {}

export interface UserInstance
  extends Model<UserModelAttributes, UserModelCreationAttributes>,
    UserModelAttributes {}

const UserModel = sequelize.define<UserInstance>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: false,
    tableName: "users",
  }
);

ShareRateUpdateModel.belongsTo(UserModel, { foreignKey: "userId" });

export default UserModel;

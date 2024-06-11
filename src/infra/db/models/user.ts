import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";

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
  }
);

export default UserModel;

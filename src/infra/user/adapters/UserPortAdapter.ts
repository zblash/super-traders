import { injectable } from "inversify";
import { CreateUserCommand } from "../../../domain/user/commands/CreateUserCommand";
import { User } from "../../../domain/user/model/User";
import { UserPort } from "../../../domain/user/ports/out/UserPort";
import UserModel from "../../db/models/UserModel";
import { UserMapper } from "../mappers/UserMapper";
import { DomainError } from "../../../domain/common/error/DomainError";

@injectable()
export class UserPortAdapter implements UserPort {
  async retrieveUserByEmail(email: string): Promise<User> {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    return UserMapper.toDomainModel(user);
  }
  async retrieveUserById(id: number): Promise<User> {
    const user = await UserModel.findByPk(id);

    if (!user) {
      throw new DomainError("User not found");
    }

    return UserMapper.toDomainModel(user);
  }

  async retrieveAllUsers(): Promise<User[]> {
    const users = await UserModel.findAll();

    return UserMapper.toDomainModelList(users);
  }
  async createUser(command: CreateUserCommand): Promise<User> {
    const user = await UserModel.create({
      name: command.name,
      email: command.email,
    });

    return UserMapper.toDomainModel(user);
  }
  async updateUser(user: User): Promise<User> {
    const foundUser = await UserModel.findByPk(user.id);

    if (!foundUser) {
      throw new DomainError("User not found");
    }

    foundUser.name = user.name;
    foundUser.email = user.email;

    await foundUser.save();

    return UserMapper.toDomainModel(foundUser);
  }
}

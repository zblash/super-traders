import "reflect-metadata";
import { injectable } from "inversify";
import { CreateUserCommand } from "../../src/domain/user/commands/CreateUserCommand";
import { User } from "../../src/domain/user/model/User";
import { UserPort } from "../../src/domain/user/ports/out/UserPort";

@injectable()
export class UserPortMockAdapter implements UserPort {
  private users: User[] = [
    {
      id: 1,
      name: "test",
      email: "test@test.com",
    },
    {
      id: 2,
      name: "test2",
      email: "test2@test.com",
    },
    {
      id: 3,
      name: "test3",
      email: "test3@test.com",
    },
  ];
  private id = 4;
  async retrieveUserByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
  async retrieveUserById(id: number): Promise<User> {
    const user = this.users.find((u) => u.id === id);
    console.log("UserById", user, id);
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
  async retrieveAllUsers(): Promise<User[]> {
    return this.users;
  }
  async createUser(command: CreateUserCommand): Promise<User> {
    const user = new User(this.id, command.name, command.email);
    this.id += 1;
    this.users.push(user);

    return user;
  }
  async updateUser(user: User): Promise<User> {
    const listUser = this.users.find((u) => u.id === user.id);

    if (!listUser) {
      throw new Error("User not found");
    }

    listUser.email = user.email;
    listUser.name = user.name;

    return listUser as User;
  }
}

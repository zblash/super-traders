import { CreateUserCommand } from "../../commands/CreateUserCommand";
import { User } from "../../model/User";

export interface UserPort {
  retrieveUserByEmail(email: string): Promise<User | null>;
  retrieveUserById(id: number): Promise<User>;
  retrieveAllUsers(): Promise<User[]>;
  createUser(command: CreateUserCommand): Promise<User>;
  updateUser(user: User): Promise<User>;
}

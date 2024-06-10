import { inject, injectable } from "inversify";
import { UseCase } from "../../../common/helper/UseCase";
import { ValidateBeforeExecution } from "../../../common/validations/UseCaseValidator";
import { User } from "../../model/User";
import { UserPort } from "../out/UserPort";
import { UpdateUserCommand } from "../../commands/UpdateUserCommand";

@injectable()
export class UpdateUserUseCase
  implements UseCase<UpdateUserCommand, Promise<User>>
{
  public constructor(
    @inject("UserPort")
    private userPort: UserPort
  ) {}

  @ValidateBeforeExecution()
  async execute(command: UpdateUserCommand): Promise<User> {
    const userById = await this.userPort.retrieveUserById(command.id);

    const userByEmail = await this.userPort.retrieveUserByEmail(command.email);

    if (userByEmail && userByEmail.id !== command.id) {
      throw new Error("User already exists");
    }

    userById.email = command.email;
    userById.name = command.name;

    return await this.userPort.updateUser(userById);
  }
}

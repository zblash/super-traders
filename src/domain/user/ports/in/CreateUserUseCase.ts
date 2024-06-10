import { inject, injectable } from "inversify";
import { UseCase } from "../../../common/helper/UseCase";
import { ValidateBeforeExecution } from "../../../common/validations/UseCaseValidator";
import { User } from "../../model/User";
import { CreateUserCommand } from "../../commands/CreateUserCommand";
import { UserPort } from "../out/UserPort";

@injectable()
export class CreateUserUseCase
  implements UseCase<CreateUserCommand, Promise<User>>
{
  public constructor(
    @inject("UserPort")
    private userPort: UserPort
  ) {}

  @ValidateBeforeExecution()
  async execute(command: CreateUserCommand): Promise<User> {
    const userByEmail = await this.userPort.retrieveUserByEmail(command.email);

    if (userByEmail) {
      throw new Error("User already exists");
    }
    return await this.userPort.createUser(command);
  }
}

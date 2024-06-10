import { inject, injectable } from "inversify";
import { UseCase } from "../../../common/helper/UseCase";
import { ValidateBeforeExecution } from "../../../common/validations/UseCaseValidator";
import { User } from "../../model/User";
import { UserPort } from "../out/UserPort";
import { retrieveUserByIdCommand } from "../../commands/RetrieveUserByIdCommand";

@injectable()
export class RetrieveUserByIdUseCase
  implements UseCase<retrieveUserByIdCommand, Promise<User>>
{
  public constructor(
    @inject("UserPort")
    private userPort: UserPort
  ) {}

  @ValidateBeforeExecution()
  async execute(command: retrieveUserByIdCommand): Promise<User> {
    return await this.userPort.retrieveUserById(command.id);
  }
}

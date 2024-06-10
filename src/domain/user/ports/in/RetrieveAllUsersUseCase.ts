import { inject, injectable } from "inversify";
import { UseCase } from "../../../common/helper/UseCase";
import { ValidateBeforeExecution } from "../../../common/validations/UseCaseValidator";
import { User } from "../../model/User";
import { UserPort } from "../out/UserPort";
import { RetrieveAllUsersCommand } from "../../commands/RetrieveAllUsersCommand";

@injectable()
export class RetrieveAllUsersUseCase
  implements UseCase<RetrieveAllUsersCommand, Promise<User[]>>
{
  public constructor(
    @inject("UserPort")
    private userPort: UserPort
  ) {}

  @ValidateBeforeExecution()
  async execute(command: RetrieveAllUsersCommand): Promise<User[]> {
    return await this.userPort.retrieveAllUsers();
  }
}

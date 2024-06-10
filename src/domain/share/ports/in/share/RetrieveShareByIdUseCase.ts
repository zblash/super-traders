import { inject, injectable } from "inversify";
import { SharePort } from "../../out/SharePort";
import { Share } from "../../../model/Share";
import { ValidateBeforeExecution } from "../../../../common/validations/UseCaseValidator";
import { UseCase } from "../../../../common/helper/UseCase";
import { RetrieveShareByIdCommand } from "../../../commands/share/RetrieveShareByIdCommand";

@injectable()
export class RetrieveShareByIdUseCase
  implements UseCase<RetrieveShareByIdCommand, Promise<Share>>
{
  public constructor(@inject("SharePort") private sharePort: SharePort) {}

  @ValidateBeforeExecution()
  async execute(command: RetrieveShareByIdCommand): Promise<Share> {
    return await this.sharePort.retrieveShareById(command.id);
  }
}

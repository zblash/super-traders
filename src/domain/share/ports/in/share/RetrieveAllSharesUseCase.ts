import { inject, injectable } from "inversify";
import { SharePort } from "../../out/SharePort";
import { Share } from "../../../model/Share";
import { ValidateBeforeExecution } from "../../../../common/validations/UseCaseValidator";
import { UseCase } from "../../../../common/helper/UseCase";
import { RetrieveAllSharesCommand } from "../../../commands/share/RetrieveAllSharesCommand";

@injectable()
export class RetrieveAllSharesUseCase
  implements UseCase<RetrieveAllSharesCommand, Promise<Share[]>>
{
  public constructor(@inject("SharePort") private sharePort: SharePort) {}

  @ValidateBeforeExecution()
  async execute(command: RetrieveAllSharesCommand): Promise<Share[]> {
    return await this.sharePort.retrieveAllShares();
  }
}

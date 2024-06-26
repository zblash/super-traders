import { inject, injectable } from "inversify";
import { SharePort } from "../../out/SharePort";
import { Share } from "../../../model/Share";
import { ValidateBeforeExecution } from "../../../../common/validations/UseCaseValidator";
import { UseCase } from "../../../../common/helper/UseCase";
import { RetrieveShareBySymbolCommand } from "../../../commands/share/RetrieveShareBySymbolCommand";
import { DomainError } from "../../../../common/error/DomainError";

@injectable()
export class RetrieveShareBySymbolUseCase
  implements UseCase<RetrieveShareBySymbolCommand, Promise<Share>>
{
  public constructor(@inject("SharePort") private sharePort: SharePort) {}

  @ValidateBeforeExecution()
  async execute(command: RetrieveShareBySymbolCommand): Promise<Share> {
    const share = await this.sharePort.retrieveShareBySymbol(command.symbol);

    if (!share) {
      throw new DomainError("Share not found");
    }

    return share;
  }
}

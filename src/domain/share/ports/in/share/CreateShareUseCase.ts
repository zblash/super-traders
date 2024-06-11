import { inject, injectable } from "inversify";
import { SharePort } from "../../out/SharePort";
import { ShareRateUpdatePort } from "../../out/ShareRateUpdatePort";
import { CreateShareCommand } from "../../../commands/share/CreateShareCommand";
import { Share } from "../../../model/Share";
import { ValidateBeforeExecution } from "../../../../common/validations/UseCaseValidator";
import { UseCase } from "../../../../common/helper/UseCase";
import { DomainError } from "../../../../common/error/DomainError";

@injectable()
export class CreateShareUseCase
  implements UseCase<CreateShareCommand, Promise<Share>>
{
  public constructor(
    @inject("SharePort") private sharePort: SharePort,
    @inject("ShareRateUpdatePort")
    private shareRateUpdatePort: ShareRateUpdatePort
  ) {}

  @ValidateBeforeExecution()
  async execute(command: CreateShareCommand): Promise<Share> {
    const shareBySymbol = await this.sharePort.retrieveShareBySymbol(
      command.symbol
    );

    if (shareBySymbol) {
      throw new DomainError("Share already exists");
    }
    const share = await this.sharePort.createShare(command);
    const rateUpdate =
      await this.shareRateUpdatePort.createSystemShareRateUpdate({
        shareId: share.id,
        userId: null,
        rate: command.rate,
      });

    share.addRateUpdate(rateUpdate);

    return share;
  }
}

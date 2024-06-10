import { inject, injectable } from "inversify";
import { ShareRateUpdatePort } from "../../out/ShareRateUpdatePort";
import { ValidateBeforeExecution } from "../../../../common/validations/UseCaseValidator";
import { UseCase } from "../../../../common/helper/UseCase";
import { CreateShareRateUpdateCommand } from "../../../commands/shareRateUpdate/CreateShareRateUpdateCommand";
import { ShareRateUpdate } from "../../../model/ShareRateUpdate";
import { RetrieveAllPortfoliosByUserUseCase } from "../../../../portfolio/ports/in/RetrieveAllPortfoliosByUserUseCase";

@injectable()
export class CreateShareRateUpdateUseCase
  implements UseCase<CreateShareRateUpdateCommand, Promise<ShareRateUpdate>>
{
  public constructor(
    @inject("ShareRateUpdatePort")
    private shareRateUpdatePort: ShareRateUpdatePort,
    @inject("RetrieveAllPortfoliosByUserUseCase")
    private retrieveAllPortfoliosByUserUseCase: RetrieveAllPortfoliosByUserUseCase
  ) {}

  @ValidateBeforeExecution()
  async execute(
    command: CreateShareRateUpdateCommand
  ): Promise<ShareRateUpdate> {
    const portfolios = await this.retrieveAllPortfoliosByUserUseCase.execute({
      userId: command.userId,
    });

    if (!portfolios || portfolios?.length === 0) {
      throw new Error("User has no portfolio");
    }

    const share = portfolios
      .map((p) => p.shareItems)
      .flat()
      .map((s) => s.share)
      .find((s) => s.id === command.shareId);

    if (!share) {
      throw new Error("Share not found");
    }

    const rateUpdate = await this.shareRateUpdatePort.createShareRateUpdate({
      shareId: share.id,
      userId: command.userId,
      rate: command.rate,
    });

    return rateUpdate;
  }
}

import { inject, injectable } from "inversify";
import { ShareRateUpdatePort } from "../../out/ShareRateUpdatePort";
import { ValidateBeforeExecution } from "../../../../common/validations/UseCaseValidator";
import { UseCase } from "../../../../common/helper/UseCase";
import { CreateShareRateUpdateCommand } from "../../../commands/shareRateUpdate/CreateShareRateUpdateCommand";
import { ShareRateUpdate } from "../../../model/ShareRateUpdate";
import { RetrieveAllPortfoliosByUserUseCase } from "../../../../portfolio/ports/in/RetrieveAllPortfoliosByUserUseCase";
import { DomainError } from "../../../../common/error/DomainError";
import { AuthorizationFacade } from "../../../../authorization/AuthorizationFacade";

@injectable()
export class CreateShareRateUpdateUseCase
  implements UseCase<CreateShareRateUpdateCommand, Promise<ShareRateUpdate>>
{
  public constructor(
    @inject("AuthorizationFacade")
    private authorizationFacade: AuthorizationFacade,
    @inject("ShareRateUpdatePort")
    private shareRateUpdatePort: ShareRateUpdatePort,
    @inject("RetrieveAllPortfoliosByUserUseCase")
    private retrieveAllPortfoliosByUserUseCase: RetrieveAllPortfoliosByUserUseCase
  ) {}

  @ValidateBeforeExecution()
  async execute(
    command: CreateShareRateUpdateCommand
  ): Promise<ShareRateUpdate> {
    await this.authorizationFacade.authorizeUser(command.userId);
    const portfolios = await this.retrieveAllPortfoliosByUserUseCase.execute({
      userId: command.userId,
    });

    if (!portfolios || portfolios?.length === 0) {
      throw new DomainError("User has no portfolio");
    }

    const share = portfolios
      .map((p) => p.shareItems)
      .flat()
      .map((s) => s.share)
      .find((s) => s.id === command.shareId);

    if (!share) {
      throw new DomainError("Share not found");
    }

    const latestRateUpdate = await this.shareRateUpdatePort.retrieveLatestShareRateUpdateByShareIdAndUserId(
      share.id,
      command.userId
    );

    if (latestRateUpdate && latestRateUpdate?.date + 3600 > Date.now()) {
      throw new DomainError("You can not add more than 1 rate update per hour");
    }

    const rateUpdate = await this.shareRateUpdatePort.createShareRateUpdate({
      shareId: share.id,
      userId: command.userId,
      rate: command.rate,
    });

    return rateUpdate;
  }
}

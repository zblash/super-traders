import { inject, injectable } from "inversify";
import { UseCase } from "../../../common/helper/UseCase";
import { ValidateBeforeExecution } from "../../../common/validations/UseCaseValidator";
import { Trade } from "../../model/Trade";
import { TradePort } from "../out/TradePort";
import { RetrieveAllTradesByShareAndUserCommand } from "../../commands/RetrieveAllTradesByShareAndUserCommand";
import { AuthorizationFacade } from "../../../authorization/AuthorizationFacade";

@injectable()
export class RetrieveAllTradesByShareAndUserUseCase
  implements UseCase<RetrieveAllTradesByShareAndUserCommand, Promise<Trade[]>>
{
  public constructor(
    @inject("AuthorizationFacade")
    private authorizationFacade: AuthorizationFacade,
    @inject("TradePort") private tradePort: TradePort) {}

  @ValidateBeforeExecution()
  async execute(
    command: RetrieveAllTradesByShareAndUserCommand
  ): Promise<Trade[]> {
    await this.authorizationFacade.authorizeUser(command.userId);
    return this.tradePort.retrieveAllTradesByShareIdAndUserId(
      command.shareId,
      command.userId
    );
  }
}

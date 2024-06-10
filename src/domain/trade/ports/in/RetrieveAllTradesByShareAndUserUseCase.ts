import { inject, injectable } from "inversify";
import { UseCase } from "../../../common/helper/UseCase";
import { ValidateBeforeExecution } from "../../../common/validations/UseCaseValidator";
import { Trade } from "../../model/Trade";
import { TradePort } from "../out/TradePort";
import { RetrieveAllTradesByShareAndUserCommand } from "../../commands/RetrieveAllTradesByShareAndUserCommand";

@injectable()
export class RetrieveAllTradesByShareAndUserUseCase
  implements UseCase<RetrieveAllTradesByShareAndUserCommand, Promise<Trade[]>>
{
  public constructor(@inject("TradePort") private tradePort: TradePort) {}

  @ValidateBeforeExecution()
  async execute(
    command: RetrieveAllTradesByShareAndUserCommand
  ): Promise<Trade[]> {
    return this.tradePort.retrieveAllTradesByShareIdAndUserId(
      command.shareId,
      command.userId
    );
  }
}

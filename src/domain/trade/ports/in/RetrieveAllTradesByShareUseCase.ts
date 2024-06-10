import { inject, injectable } from "inversify";
import { UseCase } from "../../../common/helper/UseCase";
import { ValidateBeforeExecution } from "../../../common/validations/UseCaseValidator";
import { Trade } from "../../model/Trade";
import { TradePort } from "../out/TradePort";
import { RetrieveAllTradesByShareCommand } from "../../commands/RetrieveAllTradesByShareCommand";

@injectable()
export class RetrieveAllTradesByShareUseCase
  implements UseCase<RetrieveAllTradesByShareCommand, Promise<Trade[]>>
{
  public constructor(@inject("TradePort") private tradePort: TradePort) {}

  @ValidateBeforeExecution()
  async execute(command: RetrieveAllTradesByShareCommand): Promise<Trade[]> {
    return this.tradePort.retrieveAllTradesByShareId(command.shareId);
  }
}

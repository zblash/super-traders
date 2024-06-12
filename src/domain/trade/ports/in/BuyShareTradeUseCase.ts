import { inject, injectable } from "inversify";
import { UseCase } from "../../../common/helper/UseCase";
import { ValidateBeforeExecution } from "../../../common/validations/UseCaseValidator";
import { BuyShareTradeCommand } from "../../commands/BuyShareTradeCommand";
import { Trade } from "../../model/Trade";
import { RetrievePortfolioByIdUseCase } from "../../../portfolio/ports/in/RetrievePortfolioByIdUseCase";
import { RetrieveShareByIdUseCase } from "../../../share/ports/in/share/RetrieveShareByIdUseCase";
import { TradeType } from "../../model/TradeType";
import { TradePort } from "../out/TradePort";
import { AddShareToPortfolioUseCase } from "../../../portfolio/ports/in/AddShareToPortfolioUseCase";
import { AuthorizationFacade } from "../../../authorization/AuthorizationFacade";

@injectable()
export class BuyShareTradeUseCase
  implements UseCase<BuyShareTradeCommand, Promise<Trade>>
{
  public constructor(
    @inject("AuthorizationFacade")
    private authorizationFacade: AuthorizationFacade,
    @inject("RetrievePortfolioByIdUseCase")
    private retrievePortfolioByIdUseCase: RetrievePortfolioByIdUseCase,
    @inject("AddShareToPortfolioUseCase")
    private addShareToPortfolioUseCase: AddShareToPortfolioUseCase,
    @inject("RetrieveShareByIdUseCase")
    private retrieveShareByIdUseCase: RetrieveShareByIdUseCase,
    @inject("TradePort") private tradePort: TradePort
  ) {}

  @ValidateBeforeExecution()
  async execute(command: BuyShareTradeCommand): Promise<Trade> {
    await this.authorizationFacade.authorizeUser(command.userId);
    await this.retrievePortfolioByIdUseCase.execute({
      portfolioId: command.portfolioId,
      userId: command.userId,
    });


    const share = await this.retrieveShareByIdUseCase.execute({
      id: command.shareId,
    });

    await this.addShareToPortfolioUseCase.execute({
      userId: command.userId,
      portfolioId: command.portfolioId,
      shareId: command.shareId,
      quantity: command.quantity,
    });

    const trade = new Trade(
      undefined,
      Date.now(),
      command.userId,
      command.portfolioId,
      command.shareId,
      share.getLastRate(),
      command.quantity,
      TradeType.BUY
    );

    return await this.tradePort.save(trade);
  }
}

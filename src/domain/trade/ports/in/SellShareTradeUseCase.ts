import { inject, injectable } from "inversify";
import { UseCase } from "../../../common/helper/UseCase";
import { ValidateBeforeExecution } from "../../../common/validations/UseCaseValidator";
import { Trade } from "../../model/Trade";
import { RetrievePortfolioByIdUseCase } from "../../../portfolio/ports/in/RetrievePortfolioByIdUseCase";
import { TradeType } from "../../model/TradeType";
import { TradePort } from "../out/TradePort";
import { SellShareTradeCommand } from "../../commands/SellShareTradeCommand";
import { RemoveShareFromPortfolioUseCase } from "../../../portfolio/ports/in/RemoveShareFromPortfolioUseCase";

@injectable()
export class SellShareTradeUseCase
  implements UseCase<SellShareTradeCommand, Promise<Trade>>
{
  public constructor(
    @inject("RetrievePortfolioByIdUseCase")
    private retrievePortfolioByIdUseCase: RetrievePortfolioByIdUseCase,
    @inject("RemoveShareFromPortfolioUseCase")
    private removeShareFromPortfolioUseCase: RemoveShareFromPortfolioUseCase,
    @inject("TradePort") private tradePort: TradePort
  ) {}

  @ValidateBeforeExecution()
  async execute(command: SellShareTradeCommand): Promise<Trade> {
    const portfolio = await this.retrievePortfolioByIdUseCase.execute({
      portfolioId: command.portfolioId,
      userId: command.userId,
    });

    if (!portfolio) {
      throw new Error("Portfolio not found");
    }

    const shareItem = portfolio.shareItems.find(
      (item) => item.share.id === command.shareId
    );

    if (!shareItem) {
      throw new Error("Share not found in portfolio");
    }

    if (shareItem.quantity < command.quantity) {
      throw new Error("Not enough shares in portfolio");
    }

    const allTrades = await this.tradePort.retrieveAllTradesByShareIdAndUserId(
      command.shareId,
      command.userId
    );

    if (allTrades.length > 0) {
      const buyTrades = allTrades.filter(
        (trade) => trade.type === TradeType.BUY
      );

      const sellTrades = allTrades.filter(
        (trade) => trade.type === TradeType.SELL
      );

      if (sellTrades.length > buyTrades.length) {
        throw new Error("Cannot sell more shares than were bought");
      }
    }

    await this.removeShareFromPortfolioUseCase.execute({
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
      shareItem.share.getLastRate(),
      command.quantity,
      TradeType.SELL
    );

    return await this.tradePort.save(trade);
  }
}

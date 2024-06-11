import { inject, injectable } from "inversify";
import { UseCase } from "../../../common/helper/UseCase";
import { ValidateBeforeExecution } from "../../../common/validations/UseCaseValidator";
import { Trade } from "../../model/Trade";
import { RetrievePortfolioByIdUseCase } from "../../../portfolio/ports/in/RetrievePortfolioByIdUseCase";
import { TradeType } from "../../model/TradeType";
import { TradePort } from "../out/TradePort";
import { SellShareTradeCommand } from "../../commands/SellShareTradeCommand";
import { RemoveShareFromPortfolioUseCase } from "../../../portfolio/ports/in/RemoveShareFromPortfolioUseCase";
import { DomainError } from "../../../common/error/DomainError";

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

    const shareItem = portfolio.shareItems.find(
      (item) => item.share.id === command.shareId
    );

    if (!shareItem) {
      throw new DomainError("Share not found in portfolio");
    }

    if (shareItem.quantity < command.quantity) {
      throw new DomainError("Not enough shares in portfolio");
    }

    const allTrades = await this.tradePort.retrieveAllTradesByShareId(
      command.shareId,
    );

    const trades = allTrades.map((trade) => {
      return {
        type: trade.type,
        quantity: trade.quantity,
      };
    });

    if (allTrades.length > 0) {
      const buyTrades = trades.filter(
        (trade) => trade.type === TradeType.BUY
      );

      const sellTrades = trades.filter(
        (trade) => trade.type === TradeType.SELL
      );

      if (sellTrades.reduce((p, c) => p + c.quantity, 0) + command.quantity > buyTrades.reduce((p, c) => p + c.quantity, 0)) {
        throw new DomainError("Cannot sell more shares than were bought");
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

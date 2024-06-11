import { expect } from "chai";
import { DiContainer } from "../../src/infra/DiContainer";
import { BuyShareTradeUseCase } from "../../src/domain/trade/ports/in/BuyShareTradeUseCase";
import { BuyShareTradeCommand } from "../../src/domain/trade/commands/BuyShareTradeCommand";
import { Trade } from "../../src/domain/trade/model/Trade";
import { TradeType } from "../../src/domain/trade/model/TradeType";
import { DomainError } from "../../src/domain/common/error/DomainError";

describe("BuyTradeUseCase", () => {
  let buyShareTradeUseCase: BuyShareTradeUseCase;

  before(async () => {
    DiContainer.createDiContainer();
    buyShareTradeUseCase =
      DiContainer.getDependency<BuyShareTradeUseCase>(
        "BuyShareTradeUseCase"
      );
  });

  it("should buy share", async () => {
    const trade = await buyShareTradeUseCase.execute({
      shareId: 1,
      portfolioId: 1,
      userId: 1,
      quantity: 1
    } as BuyShareTradeCommand);

    expect(trade).to.instanceOf(Trade);
    expect(trade.quantity).to.equal(1);
    expect(trade.type).to.equal(TradeType.BUY);
  });

  it("should throw error if portfolio not found", async () => {
    try {
        await buyShareTradeUseCase.execute({
            shareId: 1,
            portfolioId: 5,
            userId: 1,
            quantity: 1
        } as BuyShareTradeCommand);
    } catch (error) {
      expect(error).to.instanceOf(DomainError);
      expect((error as Error).message).to.equal("Portfolio not found");
    }
  });

  it("should throw error if share not found", async () => {
    try {
        await buyShareTradeUseCase.execute({
            shareId: 5,
            portfolioId: 1,
            userId: 1,
            quantity: 1
        } as BuyShareTradeCommand);
    } catch (error) {
      expect(error).to.instanceOf(DomainError);
      expect((error as Error).message).to.equal("Share not found");
    }
  });
});

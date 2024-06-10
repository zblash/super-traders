import { expect } from "chai";
import { DiContainer } from "../../src/infra/DiContainer";
import { Trade } from "../../src/domain/trade/model/Trade";
import { TradeType } from "../../src/domain/trade/model/TradeType";
import { SellShareTradeUseCase } from "../../src/domain/trade/ports/in/SellShareTradeUseCase";
import { SellShareTradeCommand } from "../../src/domain/trade/commands/SellShareTradeCommand";

describe("SellTradeUseCase", () => {
  let sellShareTradeUseCase: SellShareTradeUseCase;

  before(async () => {
    DiContainer.createDiContainer();
    sellShareTradeUseCase = DiContainer.getDependency<SellShareTradeUseCase>(
      "SellShareTradeUseCase"
    );
  });

  it("should sell share", async () => {
    const trade = await sellShareTradeUseCase.execute({
      shareId: 1,
      portfolioId: 1,
      userId: 1,
      quantity: 1,
    } as SellShareTradeCommand);

    expect(trade).to.instanceOf(Trade);
    expect(trade.quantity).to.equal(1);
    expect(trade.type).to.equal(TradeType.SELL);
  });

  it("should throw error if portfolio not found", async () => {
    try {
      await sellShareTradeUseCase.execute({
        shareId: 1,
        portfolioId: 5,
        userId: 1,
        quantity: 1,
      } as SellShareTradeCommand);
    } catch (error) {
      expect(error).to.instanceOf(Error);
      expect((error as Error).message).to.equal("Portfolio not found");
    }
  });

  it("should throw error if portfolio has not share", async () => {
    try {
      await sellShareTradeUseCase.execute({
        shareId: 4,
        portfolioId: 1,
        userId: 1,
        quantity: 1,
      } as SellShareTradeCommand);
    } catch (error) {
      expect(error).to.instanceOf(Error);
      expect((error as Error).message).to.equal("Share not found in portfolio");
    }
  });

  it("should throw error if portfolio has not enough share", async () => {
    try {
      await sellShareTradeUseCase.execute({
        shareId: 1,
        portfolioId: 1,
        userId: 1,
        quantity: 10000,
      } as SellShareTradeCommand);
    } catch (error) {
      expect(error).to.instanceOf(Error);
      expect((error as Error).message).to.equal(
        "Not enough shares in portfolio"
      );
    }
  });

  it("should throw error if sell more shares than were bought share", async () => {
    try {
      await sellShareTradeUseCase.execute({
        shareId: 2,
        portfolioId: 2,
        userId: 2,
        quantity: 1,
      } as SellShareTradeCommand);
    } catch (error) {
      expect(error).to.instanceOf(Error);
      expect((error as Error).message).to.equal(
        "Cannot sell more shares than were bought"
      );
    }
  });
});

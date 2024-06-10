import { expect } from "chai";
import { DiContainer } from "../../src/infra/DiContainer";
import { AddShareToPortfolioUseCase } from "../../src/domain/portfolio/ports/in/AddShareToPortfolioUseCase";
import { AddShareToPortfolioCommand } from "../../src/domain/portfolio/commands/AddShareToPortfolioCommand";
import { Portfolio } from "../../src/domain/portfolio/model/Portfolio";

describe("AddShareToPortfolioUseCase", () => {
  let addShareToPortfolioUseCase: AddShareToPortfolioUseCase;

  before(async () => {
    DiContainer.createDiContainer();
    addShareToPortfolioUseCase =
      DiContainer.getDependency<AddShareToPortfolioUseCase>(
        "AddShareToPortfolioUseCase"
      );
  });

  it("should update share quantity in portfolio", async () => {
    const portfolio = await addShareToPortfolioUseCase.execute({
      quantity: 100,
      userId: 1,
      shareId: 1,
      portfolioId: 1,
    } as AddShareToPortfolioCommand);

    expect(portfolio).to.instanceOf(Portfolio);
    expect(portfolio.shareItems[0].quantity).to.equal(200);
  });

  it("should add new share to portfolio", async () => {
    const portfolio = await addShareToPortfolioUseCase.execute({
      quantity: 100,
      userId: 1,
      shareId: 2,
      portfolioId: 1,
    } as AddShareToPortfolioCommand);

    expect(portfolio).to.instanceOf(Portfolio);
    expect(portfolio.shareItems[1].quantity).to.equal(100);
  });

  it("should throw error if portfolio not found", async () => {
    try {
      await addShareToPortfolioUseCase.execute({
        quantity: 100,
        userId: 1,
        shareId: 1,
        portfolioId: 44,
      } as AddShareToPortfolioCommand);
    } catch (error) {
      expect(error).to.instanceOf(Error);
      expect((error as Error).message).to.equal("Portfolio not found");
    }
  });

  it("should throw error if share not found", async () => {
    try {
      await addShareToPortfolioUseCase.execute({
        quantity: 100,
        userId: 1,
        shareId: 55,
        portfolioId: 1,
      } as AddShareToPortfolioCommand);
    } catch (error) {
      expect(error).to.instanceOf(Error);
      expect((error as Error).message).to.equal("Share not found");
    }
  });
});

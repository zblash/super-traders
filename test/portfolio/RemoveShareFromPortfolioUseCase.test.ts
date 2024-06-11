import { expect } from "chai";
import { DiContainer } from "../../src/infra/DiContainer";
import { Portfolio } from "../../src/domain/portfolio/model/Portfolio";
import { RemoveShareFromPortfolioUseCase } from "../../src/domain/portfolio/ports/in/RemoveShareFromPortfolioUseCase";
import { RemoveShareFromPortfolioCommand } from "../../src/domain/portfolio/commands/RemoveShareFromPortfolioCommand";
import { DomainError } from "../../src/domain/common/error/DomainError";

describe("RemoveShareFromPortfolioUseCase", () => {
  let removeShareFromPortfolioUseCase: RemoveShareFromPortfolioUseCase;

  before(async () => {
    DiContainer.createDiContainer();
    removeShareFromPortfolioUseCase =
      DiContainer.getDependency<RemoveShareFromPortfolioUseCase>(
        "RemoveShareFromPortfolioUseCase"
      );
  });

  it("should update share quantity in portfolio", async () => {
    const portfolio = await removeShareFromPortfolioUseCase.execute({
      quantity: 50,
      userId: 1,
      shareId: 1,
      portfolioId: 1,
    } as RemoveShareFromPortfolioCommand);

    expect(portfolio).to.instanceOf(Portfolio);
    expect(portfolio.shareItems[0].quantity).to.equal(50);
  });

  it("should remove share from portfolio", async () => {
    const portfolio = await removeShareFromPortfolioUseCase.execute({
      quantity: 150,
      userId: 1,
      shareId: 1,
      portfolioId: 1,
    } as RemoveShareFromPortfolioCommand);

    expect(portfolio).to.instanceOf(Portfolio);
    expect(portfolio.shareItems.length).to.equal(0);
  });

  it("should throw error if portfolio not found", async () => {
    try {
      await removeShareFromPortfolioUseCase.execute({
        quantity: 100,
        userId: 1,
        shareId: 1,
        portfolioId: 44,
      } as RemoveShareFromPortfolioCommand);
    } catch (error) {
      expect(error).to.instanceOf(DomainError);
      expect((error as Error).message).to.equal("Portfolio not found");
    }
  });

  it("should throw error if share not found", async () => {
    try {
      await removeShareFromPortfolioUseCase.execute({
        quantity: 100,
        userId: 1,
        shareId: 55,
        portfolioId: 1,
      } as RemoveShareFromPortfolioCommand);
    } catch (error) {
      expect(error).to.instanceOf(DomainError);
      expect((error as Error).message).to.equal("Share not found");
    }
  });
});

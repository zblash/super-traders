import { expect } from "chai";
import { DiContainer } from "../../src/infra/DiContainer";
import { Portfolio } from "../../src/domain/portfolio/model/Portfolio";
import { RetrievePortfolioByIdUseCase } from "../../src/domain/portfolio/ports/in/RetrievePortfolioByIdUseCase";
import { RetrievePortfolioByIdCommand } from "../../src/domain/portfolio/commands/RetrievePortfolioByIdCommand";
import { DomainError } from "../../src/domain/common/error/DomainError";

describe("RetrievePortfolioUseCases", () => {
  let retrievePortfolioByIdUseCase: RetrievePortfolioByIdUseCase;

  before(async () => {
    DiContainer.createDiContainer();
    retrievePortfolioByIdUseCase =
      DiContainer.getDependency<RetrievePortfolioByIdUseCase>(
        "RetrievePortfolioByIdUseCase"
      );
  });

  it("should retrieve portfolio", async () => {
    const portfolio = await retrievePortfolioByIdUseCase.execute({
      userId: 1,
      portfolioId: 1,
    } as RetrievePortfolioByIdCommand);

    expect(portfolio).to.instanceOf(Portfolio);
    expect(portfolio.id).to.equal(1);
    expect(portfolio.userId).to.equal(1);
  });

  it("should throw error if portfolio not found", async () => {
    try {
      await retrievePortfolioByIdUseCase.execute({
        userId: 2,
        portfolioId: 1,
      } as RetrievePortfolioByIdCommand);
    } catch (error) {
      expect(error).to.instanceOf(DomainError);
      expect((error as Error).message).to.equal("Portfolio not found");
    }
  });
});

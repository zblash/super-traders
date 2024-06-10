import { expect } from "chai";
import { DiContainer } from "../../src/infra/DiContainer";
import { CreatePortfolioUseCase } from "../../src/domain/portfolio/ports/in/CreatePortfolioUseCase";
import { CreatePortfolioCommand } from "../../src/domain/portfolio/commands/CreatePortfolioCommand";
import { Portfolio } from "../../src/domain/portfolio/model/Portfolio";

describe("CreatePortfolioUseCase", () => {
  let createPortfolioUseCase: CreatePortfolioUseCase;
  before(() => {
    DiContainer.createDiContainer();
    createPortfolioUseCase = DiContainer.getDependency<CreatePortfolioUseCase>(
      "CreatePortfolioUseCase"
    );
  });
  it("should create portfolio", async () => {
    const portfolio = await createPortfolioUseCase.execute({
      userId: 1,
      name: "Test Portfolio",
    } as CreatePortfolioCommand);

    expect(portfolio).to.instanceOf(Portfolio);
    expect(portfolio.name).to.equal("Test Portfolio");
    expect(portfolio.userId).to.equal(1);
  });
});

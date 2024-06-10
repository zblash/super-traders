import { expect } from "chai";
import { DiContainer } from "../../src/infra/DiContainer";
import { RetrieveAllTradesByShareAndUserUseCase } from "../../src/domain/trade/ports/in/RetrieveAllTradesByShareAndUserUseCase";
import { RetrieveAllTradesByShareUseCase } from "../../src/domain/trade/ports/in/RetrieveAllTradesByShareUseCase";
import { RetrieveAllTradesByShareCommand } from "../../src/domain/trade/commands/RetrieveAllTradesByShareCommand";
import { RetrieveAllTradesByShareAndUserCommand } from "../../src/domain/trade/commands/RetrieveAllTradesByShareAndUserCommand";

describe("RetrieveTradeUseCases", () => {
  let retrieveAllTradesByShareAndUserUseCase: RetrieveAllTradesByShareAndUserUseCase;

  let retrieveAllTradesByShareUseCase: RetrieveAllTradesByShareUseCase;

  before(async () => {
    DiContainer.createDiContainer();
    retrieveAllTradesByShareAndUserUseCase =
      DiContainer.getDependency<RetrieveAllTradesByShareAndUserUseCase>(
        "RetrieveAllTradesByShareAndUserUseCase"
      );
      retrieveAllTradesByShareUseCase =
      DiContainer.getDependency<RetrieveAllTradesByShareUseCase>(
        "RetrieveAllTradesByShareUseCase"
      );
  });

  it("should retrieve all trades by share", async () => {
    const trades = await retrieveAllTradesByShareUseCase.execute({
      shareId: 1,
    } as RetrieveAllTradesByShareCommand);

    expect(trades.length).to.be.greaterThan(0);
  });

  it("should throw error if portfolio not found", async () => {
    const trades = await retrieveAllTradesByShareAndUserUseCase.execute({
        shareId: 1,
        userId: 1
      } as RetrieveAllTradesByShareAndUserCommand);
  
      expect(trades.length).to.be.greaterThan(0);
  });
});

import { expect } from "chai";
import { DiContainer } from "../../src/infra/DiContainer";
import { CreateShareUseCase } from "../../src/domain/share/ports/in/share/CreateShareUseCase";
import { CreateShareCommand } from "../../src/domain/share/commands/share/CreateShareCommand";
import { Share } from "../../src/domain/share/model/Share";
import { RetrieveAllSharesBySymbolsUseCase } from "../../src/domain/share/ports/in/share/RetrieveAllSharesBySymbolsUseCase";
import { RetrieveAllSharesUseCase } from "../../src/domain/share/ports/in/share/RetrieveAllSharesUseCase";
import { RetrieveShareByIdUseCase } from "../../src/domain/share/ports/in/share/RetrieveShareByIdUseCase";
import { RetrieveShareBySymbolUseCase } from "../../src/domain/share/ports/in/share/RetrieveShareBySymbolUseCase";

describe("CreateShareUseCase", () => {
  let retrieveAllSharesBySymbolsUseCase: RetrieveAllSharesBySymbolsUseCase;
  let retrieveAllSharesUseCase: RetrieveAllSharesUseCase;
  let retrieveShareByIdUseCase: RetrieveShareByIdUseCase;
  let retrieveShareBySymbolUseCase: RetrieveShareBySymbolUseCase;
  before(() => {
    DiContainer.createDiContainer();
    retrieveAllSharesBySymbolsUseCase =
      DiContainer.getDependency<RetrieveAllSharesBySymbolsUseCase>(
        "RetrieveAllSharesBySymbolsUseCase"
      );
    retrieveAllSharesUseCase =
      DiContainer.getDependency<RetrieveAllSharesUseCase>(
        "RetrieveAllSharesUseCase"
      );
    retrieveShareByIdUseCase =
      DiContainer.getDependency<RetrieveShareByIdUseCase>(
        "RetrieveShareByIdUseCase"
      );
    retrieveShareBySymbolUseCase =
      DiContainer.getDependency<RetrieveShareBySymbolUseCase>(
        "RetrieveShareBySymbolUseCase"
      );
  });
  it("should retrieve all shares", async () => {
    const shares = await retrieveAllSharesUseCase.execute({});

    expect(shares.length).to.equal(2);
  });

  it("should retrieve all shares by symbols", async () => {
    const shares = await retrieveAllSharesBySymbolsUseCase.execute({
      symbols: [
        {
          symbol: "APL",
        },
      ],
    });

    expect(shares.length).to.equal(1);
  });

  it("should retrieve share by id", async () => {
    const share = await retrieveShareByIdUseCase.execute({
      id: 1,
    });

    expect(share.id).to.equal(1);
    expect(share.symbol).to.equal("APL");
  });

  it("should throw error if share not found", async () => {
    try {
      await retrieveShareByIdUseCase.execute({
        id: 44,
      });
    } catch (error) {
      expect(error).to.instanceOf(Error);
      expect((error as Error).message).to.equal("Share not found");
    }
  });

  it("should retrieve share by symbol", async () => {
    const share = await retrieveShareBySymbolUseCase.execute({
      symbol: "APL",
    });

    expect(share.id).to.equal(1);
    expect(share.symbol).to.equal("APL");
  });

  it("should throw error if share not by symbol found", async () => {
    try {
      await retrieveShareBySymbolUseCase.execute({
        symbol: "KOC",
      });
    } catch (error) {
      expect(error).to.instanceOf(Error);
      expect((error as Error).message).to.equal("Share not found");
    }
  });
});

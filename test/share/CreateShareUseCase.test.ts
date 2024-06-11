import { expect } from "chai";
import { DiContainer } from "../../src/infra/DiContainer";
import { CreateShareUseCase } from "../../src/domain/share/ports/in/share/CreateShareUseCase";
import { CreateShareCommand } from "../../src/domain/share/commands/share/CreateShareCommand";
import { Share } from "../../src/domain/share/model/Share";
import { DomainError } from "../../src/domain/common/error/DomainError";

describe("CreateShareUseCase", () => {
  let createShareUseCase: CreateShareUseCase;
  before(() => {
    DiContainer.createDiContainer();
    createShareUseCase =
      DiContainer.getDependency<CreateShareUseCase>("CreateShareUseCase");
  });
  it("should create share", async () => {
    const share = await createShareUseCase.execute({
      rate: 100,
      symbol: "FRD",
    } as CreateShareCommand);

    expect(share).to.instanceOf(Share);
    expect(share.id).to.equal(3);
    expect(share.symbol).to.equal("FRD");
    expect(share.getLastRate()).to.equal(100);
  });
  it("should throw error if share already exists", async () => {
    try {
      await createShareUseCase.execute({
        rate: 100,
        symbol: "APL",
      } as CreateShareCommand);
    } catch (error) {
      expect(error).to.instanceOf(DomainError);
      expect((error as Error).message).to.equal("Share already exists");
    }
  });
});

import { expect } from "chai";
import { DiContainer } from "../../src/infra/DiContainer";
import { CreateShareRateUpdateUseCase } from "../../src/domain/share/ports/in/shareRateUpdate/CreateShareUpdateUseCase";
import { CreateShareRateUpdateCommand } from "../../src/domain/share/commands/shareRateUpdate/CreateShareRateUpdateCommand";
import { ShareRateUpdate } from "../../src/domain/share/model/ShareRateUpdate";
import { DomainError } from "../../src/domain/common/error/DomainError";

describe("CreateShareRateUpdateUseCase", () => {
  let createShareRateUpdateUseCase: CreateShareRateUpdateUseCase;

  before(async () => {
    DiContainer.createDiContainer();
    createShareRateUpdateUseCase =
      DiContainer.getDependency<CreateShareRateUpdateUseCase>(
        "CreateShareRateUpdateUseCase"
      );
  });

  it("should create share rate update", async () => {
    const shareRateUpdate = await createShareRateUpdateUseCase.execute({
      rate: 100,
      userId: 1,
      shareId: 1,
    } as CreateShareRateUpdateCommand);

    expect(shareRateUpdate).to.instanceOf(ShareRateUpdate);
    expect(shareRateUpdate.shareId).to.equal(1);
    expect(shareRateUpdate.userId).to.equal(1);
    expect(shareRateUpdate.rate).to.equal(100);
    expect(shareRateUpdate.isSystemUpdate).to.equal(false);
  });

  it("should throw error if user has no portfolio", async () => {
    try {
      await createShareRateUpdateUseCase.execute({
        rate: 100,
        userId: 3,
        shareId: 1,
      } as CreateShareRateUpdateCommand);
    } catch (error) {
      expect(error).to.instanceOf(DomainError);
      expect((error as Error).message).to.equal("User has no portfolio");
    }
  });

  it("should throw error if user has no share", async () => {
    try {
      await createShareRateUpdateUseCase.execute({
        rate: 100,
        userId: 2,
        shareId: 1,
      } as CreateShareRateUpdateCommand);
    } catch (error) {
      expect(error).to.instanceOf(DomainError);
      expect((error as Error).message).to.equal("Share not found");
    }
  });

  it("should throw error if updated in last hour", async () => {
    try {
      await createShareRateUpdateUseCase.execute({
        rate: 100,
        userId: 2,
        shareId: 2,
      } as CreateShareRateUpdateCommand);
    } catch (error) {
      expect(error).to.instanceOf(DomainError);
      expect((error as Error).message).to.equal(
        "You can not add more than 1 rate update per hour"
      );
    }
  });
});

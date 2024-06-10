import { expect } from "chai";
import { DiContainer } from "../src/infra/DiContainer";
import { UpdateUserUseCase } from "../src/domain/user/ports/in/UpdateUserUseCase";
import { UpdateUserCommand } from "../src/domain/user/commands/UpdateUserCommand";

describe("UpdateUserUseCase", () => {
  let updateUserUseCase: UpdateUserUseCase;
  before(() => {
    DiContainer.createDiContainer();
    updateUserUseCase =
      DiContainer.getDependency<UpdateUserUseCase>("UpdateUserUseCase");
  });
  it("should update user", async () => {
    const user = await updateUserUseCase.execute({
      id: 1,
      name: "test4",
      email: "test4@test.com",
    } as UpdateUserCommand);

    expect(user.id).to.equal(1);
    expect(user.name).to.equal("test4");
    expect(user.email).to.equal("test4@test.com");
  });

  it("should throw error if email already used by another user", async () => {
    try {
      await updateUserUseCase.execute({
        id: 1,
        name: "test3",
        email: "test3@test.com",
      } as UpdateUserCommand);
    } catch (error) {
      expect(error).to.instanceOf(Error);
      expect((error as Error).message).to.equal("User already exists");
    }
  });

  it("should throw error if user not found", async () => {
    try {
      await updateUserUseCase.execute({
        id: 55,
        name: "test3",
        email: "test3@test.com",
      } as UpdateUserCommand);
    } catch (error) {
      expect(error).to.instanceOf(Error);
      expect((error as Error).message).to.equal("User not found");
    }
  });
});

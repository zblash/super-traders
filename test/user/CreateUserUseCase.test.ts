import { expect } from "chai";
import { DiContainer } from "../../src/infra/DiContainer";
import { CreateUserUseCase } from "../../src/domain/user/ports/in/CreateUserUseCase";
import { CreateUserCommand } from "../../src/domain/user/commands/CreateUserCommand";
import { User } from "../../src/domain/user/model/User";
import { DomainError } from "../../src/domain/common/error/DomainError";

describe("CreateUserUseCase", () => {
  let createUserUseCase: CreateUserUseCase;
  before(() => {
    DiContainer.createDiContainer();
    createUserUseCase =
      DiContainer.getDependency<CreateUserUseCase>("CreateUserUseCase");
  });
  it("should create user", async () => {
    const user = await createUserUseCase.execute({
      name: "test4",
      email: "test4@test.com",
    } as CreateUserCommand);

    expect(user).to.instanceOf(User);
    expect(user.id).to.equal(4);
    expect(user.name).to.equal("test4");
    expect(user.email).to.equal("test4@test.com");
  });

  it("should throw error if user already exists", async () => {
    try {
      await createUserUseCase.execute({
        name: "test3",
        email: "test3@test.com",
      } as CreateUserCommand);
    } catch (error) {
      expect(error).to.instanceOf(DomainError);
      expect((error as Error).message).to.equal("User already exists");
    }
  });
});

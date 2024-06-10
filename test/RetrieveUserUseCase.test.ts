import { expect } from "chai";
import { DiContainer } from "../src/infra/DiContainer";
import { RetrieveUserByIdUseCase } from "../src/domain/user/ports/in/RetrieveUserByIdUseCase";
import { retrieveUserByIdCommand } from "../src/domain/user/commands/RetrieveUserByIdCommand";
import { RetrieveAllUsersUseCase } from "../src/domain/user/ports/in/RetrieveAllUsersUseCase";

describe("RetrieveUsers", () => {
  let retrieveUserByIdUseCase: RetrieveUserByIdUseCase;
  let retrieveAllUsersUseCase: RetrieveAllUsersUseCase;
  before(() => {
    DiContainer.createDiContainer();
    retrieveUserByIdUseCase =
      DiContainer.getDependency<RetrieveUserByIdUseCase>(
        "RetrieveUserByIdUseCase"
      );
    retrieveAllUsersUseCase =
      DiContainer.getDependency<RetrieveAllUsersUseCase>(
        "RetrieveAllUsersUseCase"
      );
  });
  describe("RetrieveUserByIdUseCase", () => {
    it("should retrieve user by id", async () => {
      const user = await retrieveUserByIdUseCase.execute({
        id: 1,
      } as retrieveUserByIdCommand);
      expect(user.id).to.equal(1);
    });
  });

  describe("RetrieveAllUsersUseCase", () => {
    it("should retrieve all users", async () => {
      const users = await retrieveAllUsersUseCase.execute({});
      expect(users.length).to.equal(3);
    });
  });
});

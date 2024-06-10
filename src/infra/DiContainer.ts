import "reflect-metadata";
import { Container } from "inversify";
import { UserPortMockAdapter } from "../../test/mocks/UserPortMockAdapter";
import { UserPort } from "../domain/user/ports/out/UserPort";
import { CreateUserUseCase } from "../domain/user/ports/in/CreateUserUseCase";
import { RetrieveAllUsersUseCase } from "../domain/user/ports/in/RetrieveAllUsersUseCase";
import { RetrieveUserByIdUseCase } from "../domain/user/ports/in/RetrieveUserByIdUseCase";
import { UpdateUserUseCase } from "../domain/user/ports/in/UpdateUserUseCase";

export const DiContainer = (function () {
  let diContainer: Container;

  function configureTestDependencies() {
    if (!diContainer) {
      return;
    }

    diContainer.bind<UserPort>("UserPort").to(UserPortMockAdapter);
  }

  function configureDependencies() {}

  function configureDomainDependencies() {
    if (!diContainer) {
      return;
    }

    diContainer
    .bind<RetrieveUserByIdUseCase>("RetrieveUserByIdUseCase")
    .to(RetrieveUserByIdUseCase);
  diContainer
    .bind<RetrieveAllUsersUseCase>("RetrieveAllUsersUseCase")
    .to(RetrieveAllUsersUseCase);
  diContainer
    .bind<CreateUserUseCase>("CreateUserUseCase")
    .to(CreateUserUseCase);
  diContainer
    .bind<UpdateUserUseCase>("UpdateUserUseCase")
    .to(UpdateUserUseCase);
  }

  function createDiContainer() {
    if (diContainer) {
      return;
    }
    diContainer = new Container();

    if (process.env.TEST === "true") {
      configureTestDependencies();
    } else {
      configureDependencies();
    }

    configureDomainDependencies();
  }

  function getDependency<T>(key: string) {
    return diContainer.get<T>(key);
  }

  return { createDiContainer, getDependency };
})();

import "reflect-metadata";
import { Container } from "inversify";

export const DiContainer = (function () {
  let diContainer: Container;

  function configureTestDependencies() {
    if (!diContainer) {
      return;
    }
  }

  function configureDependencies() {}

  function configureDomainDependencies() {
    if (!diContainer) {
      return;
    }
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

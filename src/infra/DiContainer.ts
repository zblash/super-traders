import "reflect-metadata";
import { Container } from "inversify";
import { UserPort } from "../domain/user/ports/out/UserPort";
import { UserPortMockAdapter } from "../../test/mocks/UserPortMockAdapter";
import { RetrieveUserByIdUseCase } from "../domain/user/ports/in/RetrieveUserByIdUseCase";
import { RetrieveAllUsersUseCase } from "../domain/user/ports/in/RetrieveAllUsersUseCase";
import { CreateUserUseCase } from "../domain/user/ports/in/CreateUserUseCase";
import { UpdateUserUseCase } from "../domain/user/ports/in/UpdateUserUseCase";
import { CreateShareUseCase } from "../domain/share/ports/in/share/CreateShareUseCase";
import { RetrieveAllSharesBySymbolsUseCase } from "../domain/share/ports/in/share/RetrieveAllSharesBySymbolsUseCase";
import { RetrieveAllSharesUseCase } from "../domain/share/ports/in/share/RetrieveAllSharesUseCase";
import { RetrieveShareByIdUseCase } from "../domain/share/ports/in/share/RetrieveShareByIdUseCase";
import { RetrieveShareBySymbolUseCase } from "../domain/share/ports/in/share/RetrieveShareBySymbolUseCase";
import { AddShareToPortfolioUseCase } from "../domain/portfolio/ports/in/AddShareToPortfolioUseCase";
import { CreatePortfolioUseCase } from "../domain/portfolio/ports/in/CreatePortfolioUseCase";
import { RemoveShareFromPortfolioUseCase } from "../domain/portfolio/ports/in/RemoveShareFromPortfolioUseCase";
import { RetrieveAllPortfoliosByUserUseCase } from "../domain/portfolio/ports/in/RetrieveAllPortfoliosByUserUseCase";
import { RetrievePortfolioByIdUseCase } from "../domain/portfolio/ports/in/RetrievePortfolioByIdUseCase";
import { CreateShareRateUpdateUseCase } from "../domain/share/ports/in/shareRateUpdate/CreateShareUpdateUseCase";
import { BuyShareTradeUseCase } from "../domain/trade/ports/in/BuyShareTradeUseCase";
import { RetrieveAllTradesByShareAndUserUseCase } from "../domain/trade/ports/in/RetrieveAllTradesByShareAndUserUseCase";
import { RetrieveAllTradesByShareUseCase } from "../domain/trade/ports/in/RetrieveAllTradesByShareUseCase";
import { SellShareTradeUseCase } from "../domain/trade/ports/in/SellShareTradeUseCase";
import { SharePortMockAdapter } from "../../test/mocks/SharePortMockAdapter";
import { ShareRateUpdatePortMockAdapter } from "../../test/mocks/ShareRateUpdatePortMockAdapter";
import { SharePort } from "../domain/share/ports/out/SharePort";
import { ShareRateUpdatePort } from "../domain/share/ports/out/ShareRateUpdatePort";
import { PortfolioPort } from "../domain/portfolio/ports/out/PortfolioPort";
import { PortfolioPortMockAdapter } from "../../test/mocks/PortfolioPortMockAdapter";
import { TradePort } from "../domain/trade/ports/out/TradePort";
import { TradePortMockAdapter } from "../../test/mocks/TradePortMockAdapter";
import { UserPortAdapter } from "./user/adapters/UserPortAdapter";
import { SharePortAdapter } from "./share/adapters/SharePortAdapter";
import { ShareRateUpdatePortAdapter } from "./share/adapters/ShareRateUpdatePortAdapter";
import { PortfolioPortAdapter } from "./portfolio/adapters/PortfolioPortAdapter";
import { TradePortAdapter } from "./trade/adapters/TradePortAdapter";
import { AuthorizationFacade } from "../domain/authorization/AuthorizationFacade";

export const DiContainer = (function () {
  let diContainer: Container;

  function configureTestDependencies() {
    diContainer.bind<UserPort>("UserPort").to(UserPortMockAdapter);
    diContainer.bind<SharePort>("SharePort").to(SharePortMockAdapter);
    diContainer
      .bind<ShareRateUpdatePort>("ShareRateUpdatePort")
      .to(ShareRateUpdatePortMockAdapter);
    diContainer
      .bind<PortfolioPort>("PortfolioPort")
      .to(PortfolioPortMockAdapter);
    diContainer.bind<TradePort>("TradePort").to(TradePortMockAdapter);
  }

  function configureDependencies() {
    diContainer.bind<UserPort>("UserPort").to(UserPortAdapter);
    diContainer.bind<SharePort>("SharePort").to(SharePortAdapter);
    diContainer
      .bind<ShareRateUpdatePort>("ShareRateUpdatePort")
      .to(ShareRateUpdatePortAdapter);
    diContainer.bind<PortfolioPort>("PortfolioPort").to(PortfolioPortAdapter);
    diContainer.bind<TradePort>("TradePort").to(TradePortAdapter);
  }

  function configureDomainDependencies() {
    diContainer
      .bind<AuthorizationFacade>("AuthorizationFacade")
      .to(AuthorizationFacade);
    diContainer
      .bind<AddShareToPortfolioUseCase>("AddShareToPortfolioUseCase")
      .to(AddShareToPortfolioUseCase);
    diContainer
      .bind<CreatePortfolioUseCase>("CreatePortfolioUseCase")
      .to(CreatePortfolioUseCase);
    diContainer
      .bind<RemoveShareFromPortfolioUseCase>("RemoveShareFromPortfolioUseCase")
      .to(RemoveShareFromPortfolioUseCase);
    diContainer
      .bind<RetrieveAllPortfoliosByUserUseCase>(
        "RetrieveAllPortfoliosByUserUseCase"
      )
      .to(RetrieveAllPortfoliosByUserUseCase);
    diContainer
      .bind<RetrievePortfolioByIdUseCase>("RetrievePortfolioByIdUseCase")
      .to(RetrievePortfolioByIdUseCase);
    diContainer
      .bind<CreateShareUseCase>("CreateShareUseCase")
      .to(CreateShareUseCase);
    diContainer
      .bind<RetrieveAllSharesBySymbolsUseCase>(
        "RetrieveAllSharesBySymbolsUseCase"
      )
      .to(RetrieveAllSharesBySymbolsUseCase);
    diContainer
      .bind<RetrieveAllSharesUseCase>("RetrieveAllSharesUseCase")
      .to(RetrieveAllSharesUseCase);
    diContainer
      .bind<RetrieveShareByIdUseCase>("RetrieveShareByIdUseCase")
      .to(RetrieveShareByIdUseCase);
    diContainer
      .bind<RetrieveShareBySymbolUseCase>("RetrieveShareBySymbolUseCase")
      .to(RetrieveShareBySymbolUseCase);
    diContainer
      .bind<CreateShareRateUpdateUseCase>("CreateShareRateUpdateUseCase")
      .to(CreateShareRateUpdateUseCase);
    diContainer
      .bind<BuyShareTradeUseCase>("BuyShareTradeUseCase")
      .to(BuyShareTradeUseCase);
    diContainer
      .bind<RetrieveAllTradesByShareAndUserUseCase>(
        "RetrieveAllTradesByShareAndUserUseCase"
      )
      .to(RetrieveAllTradesByShareAndUserUseCase);
    diContainer
      .bind<RetrieveAllTradesByShareUseCase>("RetrieveAllTradesByShareUseCase")
      .to(RetrieveAllTradesByShareUseCase);
    diContainer
      .bind<SellShareTradeUseCase>("SellShareTradeUseCase")
      .to(SellShareTradeUseCase);
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

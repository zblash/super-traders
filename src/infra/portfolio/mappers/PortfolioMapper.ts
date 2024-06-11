import { Portfolio } from "../../../domain/portfolio/model/Portfolio";
import { PortfolioInstance } from "../../db/models/portfolio";

export const PortfolioMapper = (function () {
  function toDomainModel(portfolio: PortfolioInstance): Portfolio {
    return new Portfolio(
      portfolio.id,
      portfolio.name,
      portfolio["shareItems"].map(toDomainModel),
      portfolio.userId
    );
  }

  function toDomainModelList(portfolios: PortfolioInstance[]): Portfolio[] {
    return portfolios.map(toDomainModel);
  }

  return {
    toDomainModel,
    toDomainModelList,
  };
})();

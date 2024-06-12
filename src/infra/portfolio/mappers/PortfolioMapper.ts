import { Portfolio } from "../../../domain/portfolio/model/Portfolio";
import { PortfolioShareItem } from "../../../domain/portfolio/model/PortfolioShareItem";
import { PortfolioInstance } from "../../db/models/PortfolioModel";
import { PortfolioShareItemInstance } from "../../db/models/PortfolioShareItemModel";
import { ShareMapper } from "../../share/mappers/ShareMapper";

export const PortfolioMapper = (function () {
  function toPortfolioShareItem(
    shareItem: PortfolioShareItemInstance
  ): PortfolioShareItem {
    return new PortfolioShareItem(
      ShareMapper.toDomainModel(shareItem["Share"]),
      shareItem.portfolioId,
      shareItem.quantity
    );
  }

  function toDomainModel(portfolio: PortfolioInstance): Portfolio {
    return new Portfolio(
      portfolio.id,
      portfolio.name,
      portfolio["shareItems"]
        ? portfolio["shareItems"].map(toPortfolioShareItem)
        : [],
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

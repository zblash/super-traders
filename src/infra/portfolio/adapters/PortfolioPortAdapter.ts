import { injectable } from "inversify";
import { AddShareToPortfolioCommand } from "../../../domain/portfolio/commands/AddShareToPortfolioCommand";
import { CreatePortfolioCommand } from "../../../domain/portfolio/commands/CreatePortfolioCommand";
import { Portfolio } from "../../../domain/portfolio/model/Portfolio";
import { PortfolioShareItem } from "../../../domain/portfolio/model/PortfolioShareItem";
import { PortfolioPort } from "../../../domain/portfolio/ports/out/PortfolioPort";
import PortfolioModel from "../../db/models/portfolio";
import PortfolioShareItemModel from "../../db/models/portfolioshareitem";
import { PortfolioMapper } from "../mappers/PortfolioMapper";

@injectable()
export class PortfolioPortAdapter implements PortfolioPort {
  async create(command: CreatePortfolioCommand): Promise<Portfolio> {
    const portfolio = await PortfolioModel.create({
      name: command.name,
      userId: command.userId,
    });

    return PortfolioMapper.toDomainModel(portfolio);
  }
  async addNewShareToPortfolio(
    command: AddShareToPortfolioCommand
  ): Promise<Portfolio> {
    const portfolioShareItemModel = await PortfolioShareItemModel.create({
      portfolioId: command.portfolioId,
      shareId: command.shareId,
      quantity: command.quantity,
    });

    const portfolio = await PortfolioModel.findByPk(
      portfolioShareItemModel.portfolioId
    );

    return PortfolioMapper.toDomainModel(portfolio);
  }
  async updatePortfolioShareItem(
    command: PortfolioShareItem
  ): Promise<Portfolio> {
    const portfolioShareItemModel = await PortfolioShareItemModel.findOne({
      where: {
        portfolioId: command.portfolioId,
        shareId: command.share.id,
      },
    });

    if (!portfolioShareItemModel) {
      throw new Error("Portfolio share item not found");
    }

    portfolioShareItemModel.quantity = command.quantity;

    portfolioShareItemModel.save();

    const portfolio = await PortfolioModel.findByPk(
      portfolioShareItemModel.portfolioId
    );

    return PortfolioMapper.toDomainModel(portfolio);
  }
  async removeShareFromPortfolio(
    shareId: number,
    portfolioId: number
  ): Promise<Portfolio> {
    await PortfolioShareItemModel.destroy({
      where: {
        portfolioId,
        shareId,
      },
    });

    const portfolio = await PortfolioModel.findByPk(portfolioId);

    return PortfolioMapper.toDomainModel(portfolio);
  }
  async retrievePortfolioByIdAndUserId(
    portfolioId: number,
    userId: number
  ): Promise<Portfolio> {
    const portfolio = await PortfolioModel.findOne({
      where: {
        id: portfolioId,
        userId,
      },
    });

    if (!portfolio) {
      throw new Error("Portfolio not found");
    }

    return PortfolioMapper.toDomainModel(portfolio);
  }
  async retrieveAllPortfoliosByUserId(userId: number): Promise<Portfolio[]> {
    const portfolios = await PortfolioModel.findAll({
      where: {
        userId,
      },
    });

    return PortfolioMapper.toDomainModelList(portfolios);
  }
}

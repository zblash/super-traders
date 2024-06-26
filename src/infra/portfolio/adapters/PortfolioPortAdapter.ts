import { injectable } from "inversify";
import { AddShareToPortfolioCommand } from "../../../domain/portfolio/commands/AddShareToPortfolioCommand";
import { CreatePortfolioCommand } from "../../../domain/portfolio/commands/CreatePortfolioCommand";
import { Portfolio } from "../../../domain/portfolio/model/Portfolio";
import { PortfolioShareItem } from "../../../domain/portfolio/model/PortfolioShareItem";
import { PortfolioPort } from "../../../domain/portfolio/ports/out/PortfolioPort";
import PortfolioModel from "../../db/models/PortfolioModel";
import PortfolioShareItemModel from "../../db/models/PortfolioShareItemModel";
import { PortfolioMapper } from "../mappers/PortfolioMapper";
import { DomainError } from "../../../domain/common/error/DomainError";
import ShareModel from "../../db/models/ShareModel";
import ShareRateUpdateModel from "../../db/models/ShareRateUpdate";

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
    await PortfolioShareItemModel.create({
      portfolioId: command.portfolioId,
      shareId: command.shareId,
      quantity: command.quantity,
    });

    const portfolio = await PortfolioModel.findByPk(command.portfolioId, {
      include: [
        {
          model: PortfolioShareItemModel,
          as: "shareItems",
          include: [
            {
              model: ShareModel,
            },
          ],
        },
      ],
    });

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
      throw new DomainError("Share not found");
    }

    portfolioShareItemModel.quantity = command.quantity;

    portfolioShareItemModel.save();

    const portfolio = await PortfolioModel.findByPk(command.portfolioId, {
      include: [
        {
          model: PortfolioShareItemModel,
          as: "shareItems",
          include: [
            {
              model: ShareModel,
              include: [
                {
                  model: ShareRateUpdateModel,
                  as: "shareRateUpdates",
                },
              ],
            },
          ],
        },
      ],
    });

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

    const portfolio = await PortfolioModel.findByPk(portfolioId, {
      include: [
        {
          model: PortfolioShareItemModel,
          as: "shareItems",
          include: [
            {
              model: ShareModel,
              include: [
                {
                  model: ShareRateUpdateModel,
                  as: "shareRateUpdates",
                },
              ],
            },
          ],
        },
      ],
    });

    return PortfolioMapper.toDomainModel(portfolio);
  }
  async retrievePortfolioByIdAndUserId(
    portfolioId: number,
    userId: number
  ): Promise<Portfolio> {
    const portfolio = await PortfolioModel.findOne({
      include: [
        {
          model: PortfolioShareItemModel,
          as: "shareItems",
          include: [
            {
              model: ShareModel,
              include: [
                {
                  model: ShareRateUpdateModel,
                  as: "shareRateUpdates",
                },
              ],
            },
          ],
        },
      ],
      where: {
        id: portfolioId,
        userId,
      },
    });

    if (!portfolio) {
      throw new DomainError("Portfolio not found");
    }

    return PortfolioMapper.toDomainModel(portfolio);
  }
  async retrieveAllPortfoliosByUserId(userId: number): Promise<Portfolio[]> {
    const portfolios = await PortfolioModel.findAll({
      include: [
        {
          model: PortfolioShareItemModel,
          as: "shareItems",
          include: [
            {
              model: ShareModel,
              include: [
                {
                  model: ShareRateUpdateModel,
                  as: "shareRateUpdates",
                },
              ],
            },
          ],
        },
      ],
      where: {
        userId,
      },
    });

    return PortfolioMapper.toDomainModelList(portfolios);
  }
}

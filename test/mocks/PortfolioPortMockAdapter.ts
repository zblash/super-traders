import { injectable } from "inversify";
import { AddShareToPortfolioCommand } from "../../src/domain/portfolio/commands/AddShareToPortfolioCommand";
import { CreatePortfolioCommand } from "../../src/domain/portfolio/commands/CreatePortfolioCommand";
import { Portfolio } from "../../src/domain/portfolio/model/Portfolio";
import { PortfolioShareItem } from "../../src/domain/portfolio/model/PortfolioShareItem";
import { PortfolioPort } from "../../src/domain/portfolio/ports/out/PortfolioPort";
import { Share } from "../../src/domain/share/model/Share";
import { DomainError } from "../../src/domain/common/error/DomainError";

@injectable()
export class PortfolioPortMockAdapter implements PortfolioPort {
  private portfolios: Portfolio[] = [
    new Portfolio(
      1,
      "My Portfolio",
      [
        {
          portfolioId: 1,
          share: new Share(1, "APL", [
            {
              shareId: 1,
              userId: null,
              rate: 100,
              date: Date.now(),
              isSystemUpdate: true,
            },
          ]),
          quantity: 100,
        },
      ],
      1
    ),
    new Portfolio(
      2,
      "My Portfolio2",
      [
        {
          portfolioId: 2,
          share: new Share(2, "APL", []),
          quantity: 100,
        },
      ],
      2
    ),
  ];
  async create(command: CreatePortfolioCommand): Promise<Portfolio> {
    const newPortfolio = new Portfolio(
      command.userId,
      command.name,
      [],
      command.userId
    );

    return newPortfolio;
  }
  async addNewShareToPortfolio(
    command: AddShareToPortfolioCommand
  ): Promise<Portfolio> {
    const portfolio = this.portfolios.find((p) => p.id === command.portfolioId);

    if (!portfolio) {
      throw new DomainError("Portfolio not found");
    }

    portfolio.shareItems.push({
      portfolioId: command.portfolioId,
      share: new Share(command.shareId, "APL", []),
      quantity: command.quantity,
    });

    return portfolio;
  }
  async updatePortfolioShareItem(
    command: PortfolioShareItem
  ): Promise<Portfolio> {
    const portfolio = this.portfolios.find((p) => p.id === command.portfolioId);

    if (!portfolio) {
      throw new DomainError("Portfolio not found");
    }

    const shareItem = portfolio.shareItems.find(
      (s) => s.share.id === command.share.id
    );

    if (!shareItem) {
      throw new DomainError("Share not found");
    }

    shareItem.quantity = command.quantity;

    return portfolio;
  }
  async removeShareFromPortfolio(
    shareId: number,
    portfolioId: number
  ): Promise<Portfolio> {
    const portfolio = this.portfolios.find((p) => p.id === portfolioId);

    if (!portfolio) {
      throw new DomainError("Portfolio not found");
    }

    portfolio.shareItems = portfolio.shareItems.filter(
      (s) => s.share.id !== shareId
    );

    return portfolio;
  }
  async retrievePortfolioByIdAndUserId(
    portfolioId: number,
    userId: number
  ): Promise<Portfolio> {
    const portfolio = this.portfolios.find(
      (p) => p.id === portfolioId && p.userId === userId
    );

    if (!portfolio) {
      throw new DomainError("Portfolio not found");
    }

    return portfolio;
  }

  async retrieveAllPortfoliosByUserId(userId: number): Promise<Portfolio[]> {
    const portfolios = this.portfolios.filter((p) => p.userId === userId);

    return portfolios;
  }
}

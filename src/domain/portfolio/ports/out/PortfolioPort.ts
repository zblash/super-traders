import { AddShareToPortfolioCommand } from "../../commands/AddShareToPortfolioCommand";
import { CreatePortfolioCommand } from "../../commands/CreatePortfolioCommand";
import { Portfolio } from "../../model/Portfolio";
import { PortfolioShareItem } from "../../model/PortfolioShareItem";

export interface PortfolioPort {
  create(command: CreatePortfolioCommand): Promise<Portfolio>;
  addNewShareToPortfolio(command: AddShareToPortfolioCommand): Promise<Portfolio>;
  updatePortfolioShareItem(command: PortfolioShareItem): Promise<Portfolio>;
  removeShareFromPortfolio(shareId: number, portfolioId: number): Promise<Portfolio>;
  retrievePortfolioByIdAndUserId(portfolioId: number, userId: number): Promise<Portfolio>;
  retrieveAllPortfoliosByUserId(userId: number): Promise<Portfolio[]>;
}

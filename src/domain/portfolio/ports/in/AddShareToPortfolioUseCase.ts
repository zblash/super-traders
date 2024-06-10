import { inject, injectable } from "inversify";
import { Portfolio } from "../../model/Portfolio";
import { PortfolioPort } from "../out/PortfolioPort";
import { UseCase } from "../../../common/helper/UseCase";
import { ValidateBeforeExecution } from "../../../common/validations/UseCaseValidator";
import { AddShareToPortfolioCommand } from "../../commands/AddShareToPortfolioCommand";

@injectable()
export class AddShareToPortfolioUseCase
  implements UseCase<AddShareToPortfolioCommand, Promise<Portfolio>>
{
  public constructor(
    @inject("PortfolioPort") private portfolioPort: PortfolioPort
  ) {}

  @ValidateBeforeExecution()
  async execute(command: AddShareToPortfolioCommand): Promise<Portfolio> {
    const portfolio = await this.portfolioPort.retrievePortfolioByIdAndUserId(
      command.portfolioId,
      command.userId
    );

    if (!portfolio) {
      throw new Error("Portfolio not found");
    }

    const hasShare = portfolio.shareItems.find(
      (item) => item.share.id === command.shareId
    );

    if (hasShare) {
      hasShare.quantity += command.quantity;
      return await this.portfolioPort.updatePortfolioShareItem(hasShare);
    }

    return await this.portfolioPort.addNewShareToPortfolio(command);
  }
}

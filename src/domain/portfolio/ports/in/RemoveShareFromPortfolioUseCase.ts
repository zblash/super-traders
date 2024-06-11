import { inject, injectable } from "inversify";
import { Portfolio } from "../../model/Portfolio";
import { PortfolioPort } from "../out/PortfolioPort";
import { UseCase } from "../../../common/helper/UseCase";
import { ValidateBeforeExecution } from "../../../common/validations/UseCaseValidator";
import { RemoveShareFromPortfolioCommand } from "../../commands/RemoveShareFromPortfolioCommand";
import { DomainError } from "../../../common/error/DomainError";

@injectable()
export class RemoveShareFromPortfolioUseCase
  implements UseCase<RemoveShareFromPortfolioCommand, Promise<Portfolio>>
{
  public constructor(
    @inject("PortfolioPort") private portfolioPort: PortfolioPort
  ) {}

  @ValidateBeforeExecution()
  async execute(command: RemoveShareFromPortfolioCommand): Promise<Portfolio> {
    const portfolio = await this.portfolioPort.retrievePortfolioByIdAndUserId(
      command.portfolioId,
      command.userId
    );

    const hasShare = portfolio.shareItems.find(
      (item) => item.share.id === command.shareId
    );

    if (!hasShare) {
      throw new DomainError("Share not found");
    }

    if (hasShare.quantity > command.quantity) {
      hasShare.quantity -= command.quantity;
      return await this.portfolioPort.updatePortfolioShareItem(hasShare);
    }

    return await this.portfolioPort.removeShareFromPortfolio(
      command.shareId,
      command.portfolioId
    );
  }
}

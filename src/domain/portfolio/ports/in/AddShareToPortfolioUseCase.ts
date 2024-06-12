import { inject, injectable } from "inversify";
import { Portfolio } from "../../model/Portfolio";
import { PortfolioPort } from "../out/PortfolioPort";
import { UseCase } from "../../../common/helper/UseCase";
import { ValidateBeforeExecution } from "../../../common/validations/UseCaseValidator";
import { AddShareToPortfolioCommand } from "../../commands/AddShareToPortfolioCommand";
import { RetrieveShareByIdUseCase } from "../../../share/ports/in/share/RetrieveShareByIdUseCase";
import { AuthorizationFacade } from "../../../authorization/AuthorizationFacade";

@injectable()
export class AddShareToPortfolioUseCase
  implements UseCase<AddShareToPortfolioCommand, Promise<Portfolio>>
{
  public constructor(
    @inject("AuthorizationFacade")
    private authorizationFacade: AuthorizationFacade,
    @inject("PortfolioPort") private portfolioPort: PortfolioPort,
    @inject("RetrieveShareByIdUseCase")
    private retrieveShareByIdUseCase: RetrieveShareByIdUseCase
  ) {}

  @ValidateBeforeExecution()
  async execute(command: AddShareToPortfolioCommand): Promise<Portfolio> {
    await this.authorizationFacade.authorizeUser(command.userId);
    const portfolio = await this.portfolioPort.retrievePortfolioByIdAndUserId(
      command.portfolioId,
      command.userId
    );

    const hasShare = portfolio.shareItems.find(
      (item) => item.share.id === command.shareId
    );

    if (hasShare) {
      hasShare.quantity += command.quantity;
      return await this.portfolioPort.updatePortfolioShareItem(hasShare);
    }

    await this.retrieveShareByIdUseCase.execute({
      id: command.shareId,
    });

    return await this.portfolioPort.addNewShareToPortfolio(command);
  }
}

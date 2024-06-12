import { inject, injectable } from "inversify";
import { Portfolio } from "../../model/Portfolio";
import { PortfolioPort } from "../out/PortfolioPort";
import { UseCase } from "../../../common/helper/UseCase";
import { ValidateBeforeExecution } from "../../../common/validations/UseCaseValidator";
import { RetrievePortfolioByIdCommand } from "../../commands/RetrievePortfolioByIdCommand";
import { AuthorizationFacade } from "../../../authorization/AuthorizationFacade";

@injectable()
export class RetrievePortfolioByIdUseCase
  implements UseCase<RetrievePortfolioByIdCommand, Promise<Portfolio>>
{
  public constructor(
    @inject("AuthorizationFacade")
    private authorizationFacade: AuthorizationFacade,
    @inject("PortfolioPort") private portfolioPort: PortfolioPort
  ) {}

  @ValidateBeforeExecution()
  async execute(command: RetrievePortfolioByIdCommand): Promise<Portfolio> {
    await this.authorizationFacade.authorizeUser(command.userId);
    return this.portfolioPort.retrievePortfolioByIdAndUserId(command.portfolioId,command.userId);
  }
}

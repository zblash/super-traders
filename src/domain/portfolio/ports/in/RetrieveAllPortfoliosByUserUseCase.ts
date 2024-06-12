import { inject, injectable } from "inversify";
import { Portfolio } from "../../model/Portfolio";
import { PortfolioPort } from "../out/PortfolioPort";
import { UseCase } from "../../../common/helper/UseCase";
import { ValidateBeforeExecution } from "../../../common/validations/UseCaseValidator";
import { RetrieveAllPortfoliosByUserCommand } from "../../commands/RetrieveAllPortfoliosByUserCommand";
import { AuthorizationFacade } from "../../../authorization/AuthorizationFacade";

@injectable()
export class RetrieveAllPortfoliosByUserUseCase
  implements UseCase<RetrieveAllPortfoliosByUserCommand, Promise<Portfolio[]>>
{
  public constructor(
    @inject("AuthorizationFacade")
    private authorizationFacade: AuthorizationFacade,
    @inject("PortfolioPort") private portfolioPort: PortfolioPort
  ) {}

  @ValidateBeforeExecution()
  async execute(
    command: RetrieveAllPortfoliosByUserCommand
  ): Promise<Portfolio[]> {
    await this.authorizationFacade.authorizeUser(command.userId);
    return this.portfolioPort.retrieveAllPortfoliosByUserId(command.userId);
  }
}

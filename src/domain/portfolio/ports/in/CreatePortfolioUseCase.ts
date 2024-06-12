import { inject, injectable } from "inversify";
import { Portfolio } from "../../model/Portfolio";
import { CreatePortfolioCommand } from "../../commands/CreatePortfolioCommand";
import { PortfolioPort } from "../out/PortfolioPort";
import { UseCase } from "../../../common/helper/UseCase";
import { ValidateBeforeExecution } from "../../../common/validations/UseCaseValidator";
import { AuthorizationFacade } from "../../../authorization/AuthorizationFacade";

@injectable()
export class CreatePortfolioUseCase
  implements UseCase<CreatePortfolioCommand, Promise<Portfolio>>
{
  public constructor(
    @inject("AuthorizationFacade")
    private authorizationFacade: AuthorizationFacade,
    @inject("PortfolioPort") private portfolioPort: PortfolioPort
  ) {}

  @ValidateBeforeExecution()
  async execute(command: CreatePortfolioCommand): Promise<Portfolio> {
    await this.authorizationFacade.authorizeUser(command.userId);
    return this.portfolioPort.create(command);
  }
}

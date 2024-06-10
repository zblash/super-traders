import { inject, injectable } from "inversify";
import { Portfolio } from "../../model/Portfolio";
import { PortfolioPort } from "../out/PortfolioPort";
import { UseCase } from "../../../common/helper/UseCase";
import { ValidateBeforeExecution } from "../../../common/validations/UseCaseValidator";
import { RetrieveAllPortfoliosByUserCommand } from "../../commands/RetrieveAllPortfoliosByUserCommand";

@injectable()
export class RetrieveAllPortfoliosByUserUseCase
  implements UseCase<RetrieveAllPortfoliosByUserCommand, Promise<Portfolio[]>>
{
  public constructor(
    @inject("PortfolioPort") private portfolioPort: PortfolioPort
  ) {}

  @ValidateBeforeExecution()
  async execute(command: RetrieveAllPortfoliosByUserCommand): Promise<Portfolio[]> {
    return this.portfolioPort.retrieveAllPortfoliosByUserId(command.userId);
  }
}

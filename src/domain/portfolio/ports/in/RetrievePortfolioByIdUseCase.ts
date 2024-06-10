import { inject, injectable } from "inversify";
import { Portfolio } from "../../model/Portfolio";
import { PortfolioPort } from "../out/PortfolioPort";
import { UseCase } from "../../../common/helper/UseCase";
import { ValidateBeforeExecution } from "../../../common/validations/UseCaseValidator";
import { RetrievePortfolioByIdCommand } from "../../commands/RetrievePortfolioByIdCommand";

@injectable()
export class RetrievePortfolioByIdUseCase
  implements UseCase<RetrievePortfolioByIdCommand, Promise<Portfolio>>
{
  public constructor(
    @inject("PortfolioPort") private portfolioPort: PortfolioPort
  ) {}

  @ValidateBeforeExecution()
  async execute(command: RetrievePortfolioByIdCommand): Promise<Portfolio> {
    return this.portfolioPort.retrievePortfolioByIdAndUserId(command.portfolioId,command.userId);
  }
}

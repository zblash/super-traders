import { inject, injectable } from "inversify";
import { Portfolio } from "../../model/Portfolio";
import { CreatePortfolioCommand } from "../../commands/CreatePortfolioCommand";
import { PortfolioPort } from "../out/PortfolioPort";
import { UseCase } from "../../../common/helper/UseCase";
import { ValidateBeforeExecution } from "../../../common/validations/UseCaseValidator";

@injectable()
export class CreatePortfolioUseCase
  implements UseCase<CreatePortfolioCommand, Promise<Portfolio>>
{
  public constructor(
    @inject("PortfolioPort") private portfolioPort: PortfolioPort
  ) {}

  @ValidateBeforeExecution()
  async execute(command: CreatePortfolioCommand): Promise<Portfolio> {
    return this.portfolioPort.create(command);
  }
}

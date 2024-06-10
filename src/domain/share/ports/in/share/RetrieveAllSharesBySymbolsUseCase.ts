import { inject, injectable } from "inversify";
import { SharePort } from "../../out/SharePort";
import { Share } from "../../../model/Share";
import { ValidateBeforeExecution } from "../../../../common/validations/UseCaseValidator";
import { UseCase } from "../../../../common/helper/UseCase";
import { RetrieveAllSharesBySymbolsCommand } from "../../../commands/share/RetrieveAllSharesBySymbolsCommand";

@injectable()
export class RetrieveAllSharesBySymbolsUseCase
  implements UseCase<RetrieveAllSharesBySymbolsCommand, Promise<Share[]>>
{
  public constructor(@inject("SharePort") private sharePort: SharePort) {}

  @ValidateBeforeExecution()
  async execute(command: RetrieveAllSharesBySymbolsCommand): Promise<Share[]> {
    return await this.sharePort.retrieveAllSharesBySymbolList(
      command.symbols.map((s) => s.symbol)
    );
  }
}

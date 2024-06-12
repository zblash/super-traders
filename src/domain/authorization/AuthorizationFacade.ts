import { inject, injectable } from "inversify";
import { RetrieveUserByIdUseCase } from "../user/ports/in/RetrieveUserByIdUseCase";

@injectable()
export class AuthorizationFacade {
  constructor(
    @inject("RetrieveUserByIdUseCase")
    private retrieveUserByIdUseCase: RetrieveUserByIdUseCase
  ) {}

  async authorizeUser(id: number) {
    const user = await this.retrieveUserByIdUseCase.execute({ id });

    return true;
  }
}

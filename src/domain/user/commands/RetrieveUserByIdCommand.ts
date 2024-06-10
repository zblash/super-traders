import { IsNumber } from "class-validator";

export class retrieveUserByIdCommand {
  @IsNumber()
  id: number;
}

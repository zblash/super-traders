import { IsNumber } from "class-validator";

export class RetrieveShareByIdCommand {
  @IsNumber()
  id: number;
}

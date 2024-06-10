import { IsNumber } from "class-validator";

export class RetrieveAllTradesByShareCommand {
  @IsNumber()
  shareId: number;
}

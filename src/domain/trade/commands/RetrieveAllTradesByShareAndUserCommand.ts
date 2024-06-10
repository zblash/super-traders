import { IsNumber } from "class-validator";
import { RetrieveAllTradesByShareCommand } from "./RetrieveAllTradesByShareCommand";

export class RetrieveAllTradesByShareAndUserCommand extends RetrieveAllTradesByShareCommand {
  @IsNumber()
  userId: number;
}

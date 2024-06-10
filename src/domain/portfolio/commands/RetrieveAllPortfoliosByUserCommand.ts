import { IsNumber } from "class-validator";

export class RetrieveAllPortfoliosByUserCommand {
  @IsNumber()
  userId: number;
}

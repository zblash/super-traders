import { IsNumber } from "class-validator";

export class RetrievePortfolioByIdCommand {
  @IsNumber()
  portfolioId: number;

  @IsNumber()
  userId: number;
}

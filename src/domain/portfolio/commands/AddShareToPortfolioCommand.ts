import { IsNumber } from "class-validator";

export class AddShareToPortfolioCommand {
  @IsNumber()
  userId: number;

  @IsNumber()
  shareId: number;

  @IsNumber()
  portfolioId: number;

  @IsNumber()
  quantity: number;
}

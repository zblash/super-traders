import { IsNumber } from "class-validator";

export class BuyShareTradeCommand {
  @IsNumber()
  userId: number;

  @IsNumber()
  portfolioId: number;

  @IsNumber()
  shareId: number;

  @IsNumber()
  quantity: number;
}

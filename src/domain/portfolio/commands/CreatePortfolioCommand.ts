import { IsNumber, IsOptional } from "class-validator";

export class CreatePortfolioCommand {
  @IsNumber()
  userId: number;

  @IsNumber()
  name: string;
}

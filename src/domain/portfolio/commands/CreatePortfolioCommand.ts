import { IsNumber, IsString } from "class-validator";

export class CreatePortfolioCommand {
  @IsNumber()
  userId: number;

  @IsString()
  name: string;
}

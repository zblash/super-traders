import { IsNumber } from "class-validator";


export class CreateShareRateUpdateCommand {
  @IsNumber()
  shareId: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  rate: number;
}

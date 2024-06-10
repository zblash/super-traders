import { IsString, MaxLength, MinLength } from "class-validator";

export class RetrieveShareBySymbolCommand {
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  symbol: string;
}

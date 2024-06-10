import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateShareCommand {
    @IsNumber()
    rate: number

    @IsString()
    @MinLength(3)
    @MaxLength(3)
    symbol: string
}
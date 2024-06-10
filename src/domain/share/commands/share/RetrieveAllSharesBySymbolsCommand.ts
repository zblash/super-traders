import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { RetrieveShareBySymbolCommand } from "./RetrieveShareBySymbolCommand";

export class RetrieveAllSharesBySymbolsCommand {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => RetrieveShareBySymbolCommand)
    symbols: RetrieveShareBySymbolCommand[];
}

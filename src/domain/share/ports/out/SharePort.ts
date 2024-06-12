import { CreateShareCommand } from "../../commands/share/CreateShareCommand";
import { Share } from "../../model/Share";

export interface SharePort {
  createShare(command: CreateShareCommand): Promise<Share>;
  retrieveShareBySymbol(symbol: string): Promise<Share>;
  retrieveShareById(id: number): Promise<Share>;
  retrieveAllShares(): Promise<Share[]>;
  retrieveAllSharesBySymbolList(symbolList: string[]): Promise<Share[]>;
}

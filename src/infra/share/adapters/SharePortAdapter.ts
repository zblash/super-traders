import { injectable } from "inversify";
import { CreateShareCommand } from "../../../domain/share/commands/share/CreateShareCommand";
import { Share } from "../../../domain/share/model/Share";
import { SharePort } from "../../../domain/share/ports/out/SharePort";
import ShareModel from "../../db/models/share";
import { ShareMapper } from "../mappers/ShareMapper";

@injectable()
export class SharePortAdapter implements SharePort {
  async createShare(command: CreateShareCommand): Promise<Share> {
    const share = await ShareModel.create({
      symbol: command.symbol,
    });

    return ShareMapper.toDomainModel(share);
  }
  async retrieveShareBySymbol(symbol: string): Promise<Share> {
    const share = await ShareModel.findOne({ where: { symbol } });

    return ShareMapper.toDomainModel(share);
  }
  async retrieveShareById(id: number): Promise<Share> {
    const share = await ShareModel.findByPk(id);

    if (!share) {
      throw new Error("Share not found");
    }

    return ShareMapper.toDomainModel(share);
  }
  async retrieveAllShares(): Promise<Share[]> {
    const shares = await ShareModel.findAll();

    return ShareMapper.toDomainModelList(shares);
  }
  async retrieveAllSharesBySymbolList(symbolList: string[]): Promise<Share[]> {
    const shares = await ShareModel.findAll({ where: { symbol: symbolList } });

    return ShareMapper.toDomainModelList(shares);
  }
}

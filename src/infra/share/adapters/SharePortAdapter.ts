import { injectable } from "inversify";
import { CreateShareCommand } from "../../../domain/share/commands/share/CreateShareCommand";
import { Share } from "../../../domain/share/model/Share";
import { SharePort } from "../../../domain/share/ports/out/SharePort";
import ShareModel from "../../db/models/ShareModel";
import { ShareMapper } from "../mappers/ShareMapper";
import { DomainError } from "../../../domain/common/error/DomainError";
import ShareRateUpdateModel from "../../db/models/ShareRateUpdate";

@injectable()
export class SharePortAdapter implements SharePort {
  async createShare(command: CreateShareCommand): Promise<Share> {
    const share = await ShareModel.create({
      symbol: command.symbol,
    });

    return ShareMapper.toDomainModel(share);
  }
  async retrieveShareBySymbol(symbol: string): Promise<Share> {
    const share = await ShareModel.findOne({
      include: [
        {
          model: ShareRateUpdateModel,
          as: "shareRateUpdates",
        },
      ],
      where: { symbol },
    });

    if (!share) {
      return null;
    }

    return ShareMapper.toDomainModel(share);
  }
  async retrieveShareById(id: number): Promise<Share> {
    const share = await ShareModel.findByPk(id, {
      include: [
        {
          model: ShareRateUpdateModel,
          as: "shareRateUpdates",
        },
      ],
    });

    if (!share) {
      throw new DomainError("Share not found");
    }

    return ShareMapper.toDomainModel(share);
  }
  async retrieveAllShares(): Promise<Share[]> {
    const shares = await ShareModel.findAll({
      include: [
        {
          model: ShareRateUpdateModel,
          as: "shareRateUpdates",
        },
      ],
    });

    return ShareMapper.toDomainModelList(shares);
  }
  async retrieveAllSharesBySymbolList(symbolList: string[]): Promise<Share[]> {
    const shares = await ShareModel.findAll({
      include: [
        {
          model: ShareRateUpdateModel,
          as: "shareRateUpdates",
        },
      ],
      where: { symbol: symbolList },
    });

    return ShareMapper.toDomainModelList(shares);
  }
}

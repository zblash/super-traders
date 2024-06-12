import { injectable } from "inversify";
import { CreateShareRateUpdateCommand } from "../../../domain/share/commands/shareRateUpdate/CreateShareRateUpdateCommand";
import { ShareRateUpdate } from "../../../domain/share/model/ShareRateUpdate";
import { ShareRateUpdatePort } from "../../../domain/share/ports/out/ShareRateUpdatePort";
import ShareRateUpdateModel from "../../db/models/ShareRateUpdate";
import { ShareMapper } from "../mappers/ShareMapper";

@injectable()
export class ShareRateUpdatePortAdapter implements ShareRateUpdatePort {
  async createShareRateUpdate(
    command: CreateShareRateUpdateCommand
  ): Promise<ShareRateUpdate> {
    const shareRateUpdate = await ShareRateUpdateModel.create({
      shareId: command.shareId,
      userId: command.userId,
      isSystemUpdate: false,
      rate: Number(command.rate.toFixed(2)),
      date: Date.now(),
    });

    return ShareMapper.toShareRateUpdateDomainModel(shareRateUpdate);
  }
  async createSystemShareRateUpdate(
    command: CreateShareRateUpdateCommand
  ): Promise<ShareRateUpdate> {
    const shareRateUpdate = await ShareRateUpdateModel.create({
      shareId: command.shareId,
      userId: null,
      isSystemUpdate: true,
      rate: Number(command.rate.toFixed(2)),
      date: Date.now(),
    });

    return ShareMapper.toShareRateUpdateDomainModel(shareRateUpdate);
  }
  async retrieveLatestShareRateUpdateByShareIdAndUserId(
    shareId: number,
    userId: number
  ): Promise<ShareRateUpdate> {
    const shareRateUpdates = await ShareRateUpdateModel.findAll({
      where: { shareId, userId },
      order: [["date", "DESC"]],
      limit: 1,
    });

    if (shareRateUpdates.length === 0) {
      return null;
    }
    
    return ShareMapper.toShareRateUpdateDomainModel(shareRateUpdates[0]);
  }
}

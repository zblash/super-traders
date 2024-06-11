import { injectable } from "inversify";
import { CreateShareRateUpdateCommand } from "../../../domain/share/commands/shareRateUpdate/CreateShareRateUpdateCommand";
import { ShareRateUpdate } from "../../../domain/share/model/ShareRateUpdate";
import { ShareRateUpdatePort } from "../../../domain/share/ports/out/ShareRateUpdatePort";
import ShareRateUpdateModel from "../../db/models/sharerateupdate";
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
      rate: command.rate,
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
      rate: command.rate,
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
    });

    return ShareMapper.toShareRateUpdateDomainModel(shareRateUpdates[0]);
  }
}

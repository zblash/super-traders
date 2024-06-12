import { CreateShareRateUpdateCommand } from "../../commands/shareRateUpdate/CreateShareRateUpdateCommand";
import { ShareRateUpdate } from "../../model/ShareRateUpdate";

export interface ShareRateUpdatePort {
  createShareRateUpdate(
    command: CreateShareRateUpdateCommand
  ): Promise<ShareRateUpdate>;
  createSystemShareRateUpdate(
    command: CreateShareRateUpdateCommand
  ): Promise<ShareRateUpdate>;
  retrieveLatestShareRateUpdateByShareIdAndUserId(
    shareId: number,
    userId: number
  ): Promise<ShareRateUpdate>;
}

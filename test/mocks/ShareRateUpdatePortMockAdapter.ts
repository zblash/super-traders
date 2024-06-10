import { injectable } from "inversify";
import { CreateShareRateUpdateCommand } from "../../src/domain/share/commands/shareRateUpdate/CreateShareRateUpdateCommand";
import { ShareRateUpdate } from "../../src/domain/share/model/ShareRateUpdate";
import { ShareRateUpdatePort } from "../../src/domain/share/ports/out/ShareRateUpdatePort";

@injectable()
export class ShareRateUpdatePortMockAdapter implements ShareRateUpdatePort {
  private shareRateUpdates: ShareRateUpdate[] = [
    new ShareRateUpdate(1, null, true, 100, Date.now()),
    new ShareRateUpdate(2, null, true, 200, Date.now()),
  ];
  async createShareRateUpdate(
    command: CreateShareRateUpdateCommand
  ): Promise<ShareRateUpdate> {
    const shareRateUpdate = new ShareRateUpdate(
      command.shareId,
      command.userId,
      false,
      command.rate,
      Date.now()
    )
    
    this.shareRateUpdates.push(shareRateUpdate);

    return shareRateUpdate;
  }
  async createSystemShareRateUpdate(
    command: CreateShareRateUpdateCommand
  ): Promise<ShareRateUpdate> {
    const shareRateUpdate = new ShareRateUpdate(
        command.shareId,
        null,
        true,
        command.rate,
        Date.now()
      )
      
      this.shareRateUpdates.push(shareRateUpdate);
  
      return shareRateUpdate;
    }

    async retrieveLatestShareRateUpdateByShareIdAndUserId(shareId: number, userId: number): Promise<ShareRateUpdate> {
      if (shareId === 1 && userId === 1) {
        return new ShareRateUpdate(1, 1, false, 100, Date.now() - 5000);
      }

      if (shareId === 2 && userId === 2) {
        return new ShareRateUpdate(2, 2, false, 200, Date.now());
      }
    }
}

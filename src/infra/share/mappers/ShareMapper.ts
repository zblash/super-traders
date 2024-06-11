import { Share } from "../../../domain/share/model/Share";
import { ShareRateUpdate } from "../../../domain/share/model/ShareRateUpdate";
import { ShareInstance } from "../../db/models/ShareModel";
import { ShareRateUpdateInstance } from "../../db/models/ShareRateUpdate";

export const ShareMapper = (function () {
  function toDomainModel(share: ShareInstance): Share {
    return new Share(
      share.id,
      share.symbol,
      share["shareRateUpdates"].map(toShareRateUpdateDomainModel)
    );
  }

  function toDomainModelList(shareList: ShareInstance[]): Share[] {
    return shareList.map((share) => toDomainModel(share));
  }

  function toShareRateUpdateDomainModel(
    shareRateUpdate: ShareRateUpdateInstance
  ): ShareRateUpdate {
    return new ShareRateUpdate(
      shareRateUpdate.shareId,
      shareRateUpdate.userId,
      shareRateUpdate.isSystemUpdate,
      shareRateUpdate.rate,
      shareRateUpdate.date
    );
  }

  function toShareRateUpdateDomainModelList(
    shareRateUpdateList: ShareRateUpdateInstance[]
  ): ShareRateUpdate[] {
    return shareRateUpdateList.map((shareRateUpdate) =>
      toShareRateUpdateDomainModel(shareRateUpdate)
    );
  }

  return {
    toDomainModel,
    toDomainModelList,
    toShareRateUpdateDomainModel,
    toShareRateUpdateDomainModelList,
  };
})();

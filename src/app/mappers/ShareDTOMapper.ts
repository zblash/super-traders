import { Share } from "../../domain/share/model/Share";
import { ShareRateUpdate } from "../../domain/share/model/ShareRateUpdate";
import { ReadableShareDTO, ReadableShareRateUpdateDTO } from "../dtos/ReadableShareDTO";

export const ShareDTOMapper = (function () {
    function toReadableShareRateDTO(shareRateUpdate: ShareRateUpdate): ReadableShareRateUpdateDTO {
        return {
            rate: shareRateUpdate.rate,
            date: shareRateUpdate.date,
            userId: shareRateUpdate.userId,
            isSystemUpdate: shareRateUpdate.isSystemUpdate
        }
    }

    function toReadableShareRateDTOList(shareRateUpdates: ShareRateUpdate[]): ReadableShareRateUpdateDTO[] {
        return shareRateUpdates.map(toReadableShareRateDTO)
    } 

    function toReadableShareDTO(share: Share): ReadableShareDTO {
        return {
            id: share.id,
            symbol: share.symbol,
            rate: share.getLastRate(),
            shareRateUpdates: toReadableShareRateDTOList(share.shareRateUpdates)
        }
    }

    function toReadableShareDTOList(shares: Share[]): ReadableShareDTO[] {
        return shares.map(toReadableShareDTO)
    }

    return {
        toReadableShareRateDTO,
        toReadableShareRateDTOList,
        toReadableShareDTO,
        toReadableShareDTOList
    }
})()
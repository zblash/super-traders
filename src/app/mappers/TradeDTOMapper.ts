import { Trade } from "../../domain/trade/model/Trade";
import { ReadableTradeDTO } from "../dtos/ReadableTradeDTO";

export const TradeDTOMapper = (function () {
    function toReadableTradeDTO(trade: Trade): ReadableTradeDTO {
        return {
            id: trade.id,
            date: trade.date,
            userId: trade.userId,
            portfolioId: trade.portfolioId,
            shareId: trade.shareId,
            rate: trade.rate,
            quantity: trade.quantity,
            type: trade.type.toString()
        }
    }

    function toReadableTradeDTOList(trades: Trade[]): ReadableTradeDTO[] {
        return trades.map(toReadableTradeDTO)
    }

    return {
        toReadableTradeDTO,
        toReadableTradeDTOList
    }
})()
import { injectable } from "inversify";
import { Trade } from "../../../domain/trade/model/Trade";
import { TradePort } from "../../../domain/trade/ports/out/TradePort";
import TradeModel from "../../db/models/trade";
import { TradeMapper } from "../mappers/TradeMapper";

@injectable()
export class TradePortAdapter implements TradePort {
  async save(trade: Trade): Promise<Trade> {
    const savedTrade = await TradeModel.create({
      date: trade.date,
      userId: trade.userId,
      portfolioId: trade.portfolioId,
      shareId: trade.shareId,
      rate: trade.rate,
      quantity: trade.quantity,
      type: trade.type,
    });

    return TradeMapper.toDomainModel(savedTrade);
  }
  async retrieveAllTradesByShareId(shareId: number): Promise<Trade[]> {
    const trades = await TradeModel.findAll({ where: { shareId } });

    return TradeMapper.toDomainModelList(trades);
  }
  async retrieveAllTradesByShareIdAndUserId(
    shareId: number,
    userId: number
  ): Promise<Trade[]> {
    const trades = await TradeModel.findAll({ where: { shareId, userId } });

    return TradeMapper.toDomainModelList(trades);
  }
}

import { Trade } from "../../model/Trade";

export interface TradePort {
  save(trade: Trade): Promise<Trade>;
  retrieveAllTradesByShareId(shareId: number): Promise<Trade[]>;
  retrieveAllTradesByShareIdAndUserId(
    shareId: number,
    userId: number
  ): Promise<Trade[]>;
}

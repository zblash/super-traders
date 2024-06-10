import { TradeType } from "./TradeType";

export class Trade {
  constructor(
    public id: number,
    public date: number,
    public userId: number,
    public portfolioId: number,
    public shareId: number,
    public rate: number,
    public quantity: number,
    public type: TradeType
  ) {}
}

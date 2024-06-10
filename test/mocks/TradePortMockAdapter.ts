import { injectable } from "inversify";
import { Trade } from "../../src/domain/trade/model/Trade";
import { TradeType } from "../../src/domain/trade/model/TradeType";
import { TradePort } from "../../src/domain/trade/ports/out/TradePort";

@injectable()
export class TradePortMockAdapter implements TradePort {
    private trades: Trade[] = [{
        id: 1,
        date: Date.now(),
        userId: 1,
        portfolioId: 1,
        shareId: 1,
        rate: 1,
        quantity: 1,
        type: TradeType.BUY
    }, {
        id: 2,
        date: Date.now(),
        userId: 1,
        portfolioId: 1,
        shareId: 1,
        rate: 1,
        quantity: 1,
        type: TradeType.SELL
    },
    {
        id: 3,
        date: Date.now(),
        userId: 1,
        portfolioId: 1,
        shareId: 1,
        rate: 1,
        quantity: 1,
        type: TradeType.BUY
    },
    {
        id: 4,
        date: Date.now(),
        userId: 2,
        portfolioId: 1,
        shareId: 1,
        rate: 1,
        quantity: 1,
        type: TradeType.SELL
    },
    {
        id: 5,
        date: Date.now(),
        userId: 2,
        portfolioId: 1,
        shareId: 1,
        rate: 1,
        quantity: 1,
        type: TradeType.BUY
    },
    {
        id: 6,
        date: Date.now(),
        userId: 2,
        portfolioId: 1,
        shareId: 1,
        rate: 1,
        quantity: 1,
        type: TradeType.BUY
    },
    {
        id: 7,
        date: Date.now(),
        userId: 1,
        portfolioId: 1,
        shareId: 2,
        rate: 1,
        quantity: 1,
        type: TradeType.BUY
    },
    {
        id: 8,
        date: Date.now(),
        userId: 1,
        portfolioId: 1,
        shareId: 2,
        rate: 1,
        quantity: 1,
        type: TradeType.SELL
    },
    {
        id: 9,
        date: Date.now(),
        userId: 1,
        portfolioId: 1,
        shareId: 2,
        rate: 1,
        quantity: 1,
        type: TradeType.SELL
    }
];
    async save(trade: Trade): Promise<Trade> {
        return trade;
    }
    async retrieveAllTradesByShareId(shareId: number): Promise<Trade[]> {
        const trades = this.trades.filter(t => t.shareId === shareId);

        return trades;
    }
    async retrieveAllTradesByShareIdAndUserId(shareId: number, userId: number): Promise<Trade[]> {
        const trades = this.trades.filter(t => t.shareId === shareId && t.userId === userId);

        return trades;
    }
}
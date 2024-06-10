import { injectable } from "inversify";
import { CreateShareCommand } from "../../src/domain/share/commands/share/CreateShareCommand";
import { Share } from "../../src/domain/share/model/Share";
import { SharePort } from "../../src/domain/share/ports/out/SharePort";

@injectable()
export class SharePortMockAdapter implements SharePort {
  private shares: Share[] = [
    new Share(1, "APL", [
      {
        shareId: 1,
        userId: null,
        rate: 100,
        date: Date.now(),
        isSystemUpdate: true,
      },
    ]),
    new Share(2, "NVD", [
      {
        shareId: 2,
        userId: null,
        rate: 120,
        date: Date.now(),
        isSystemUpdate: true,
      },
    ]),
  ];

  async createShare(command: CreateShareCommand): Promise<Share> {
    const share = new Share(this.shares.length + 1, command.symbol, []);

    this.shares.push(share);

    return share;
  }
  async retrieveShareBySymbol(symbol: string): Promise<Share> {
    const share = this.shares.find((s) => s.symbol === symbol);

    return share;
  }
  async retrieveShareById(id: number): Promise<Share> {
    const share = this.shares.find((s) => s.id === id);

    if (!share) {
      throw new Error("Share not found");
    }

    return share;
  }
  async retrieveAllShares(): Promise<Share[]> {
    return this.shares;
  }
  async retrieveAllSharesBySymbolList(symbolList: string[]): Promise<Share[]> {
    const share = this.shares.filter((s) => symbolList.includes(s.symbol));

    return share;
  }
}

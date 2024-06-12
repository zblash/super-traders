import { ShareRateUpdate } from "./ShareRateUpdate";

export class Share {
  constructor(
    public id: number,
    public symbol: string,
    public shareRateUpdates: ShareRateUpdate[]
  ) {}

  public addRateUpdate(rate: ShareRateUpdate) {
    if (!this.shareRateUpdates) {
      this.shareRateUpdates = [];
    }
    this.shareRateUpdates.push(rate);
  }

  public getLastRate() {
    return this.shareRateUpdates.sort((a, b) => b.date - a.date)[0].rate;
  }
}

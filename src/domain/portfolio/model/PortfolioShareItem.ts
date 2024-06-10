import { Share } from "../../share/model/Share";

export class PortfolioShareItem {
  constructor(
    public share: Share,
    public portfolioId: number,
    public quantity: number
  ) {}
}

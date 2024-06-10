import { PortfolioShareItem } from "./PortfolioShareItem";

export class Portfolio {
  constructor(
    public id: number,
    public name: string,
    public shareItems: PortfolioShareItem[],
    public userId: number
  ) {}
}

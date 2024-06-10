import { Share } from "../../share/model/Share";
import { PortfolioShareItem } from "./PortfolioShareItem";

export class Portfolio {
  constructor(
    public id: string,
    public name: string,
    public shareItems: PortfolioShareItem[],
    public userId: number
  ) {}
}

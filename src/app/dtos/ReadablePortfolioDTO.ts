import { ReadablePortfolioShareItemDTO } from "./ReadablePortfolioShareItemDTO";

export type ReadablePortfolioDTO = {
  id: number;
  name: string;
  userId: number;
  shareItems: ReadablePortfolioShareItemDTO[];
};

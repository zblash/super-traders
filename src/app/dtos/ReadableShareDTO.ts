export type ReadableShareRateUpdateDTO = {
  rate: number;
  date: number;
  userId: number;
  isSystemUpdate: boolean;
};

export type ReadableShareDTO = {
  id: number;
  symbol: string;
  rate: number;
  shareRateUpdates: ReadableShareRateUpdateDTO[];
};

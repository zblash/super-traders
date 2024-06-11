import { Trade } from "../../../domain/trade/model/Trade";
import { TradeInstance } from "../../db/models/TradeModel";

export const TradeMapper = (function () {
  function toDomainModel(dbModel: TradeInstance): Trade {
    return new Trade(
      dbModel.id,
      dbModel.date,
      dbModel.userId,
      dbModel.portfolioId,
      dbModel.shareId,
      dbModel.rate,
      dbModel.quantity,
      dbModel.type
    );
  }

  function toDomainModelList(dbModelList: TradeInstance[]): Trade[] {
    return dbModelList.map((dbModel) => toDomainModel(dbModel));
  }

  return {
    toDomainModel,
    toDomainModelList,
  };
})();

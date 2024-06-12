import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import { DiContainer } from "../../infra/DiContainer";
import { RetrieveAllTradesByShareAndUserUseCase } from "../../domain/trade/ports/in/RetrieveAllTradesByShareAndUserUseCase";
import { RetrieveAllTradesByShareUseCase } from "../../domain/trade/ports/in/RetrieveAllTradesByShareUseCase";
import { TradeDTOMapper } from "../mappers/TradeDTOMapper";
import { Trade } from "../../domain/trade/model/Trade";
import { BuyShareTradeUseCase } from "../../domain/trade/ports/in/BuyShareTradeUseCase";
import { SellShareTradeUseCase } from "../../domain/trade/ports/in/SellShareTradeUseCase";

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "/trades",
    {
      schema: {
        querystring: Type.Object({
          shareId: Type.Number(),
          userId: Type.Optional(Type.Number()),
        }),
        response: {
          200: Type.Object({
            trades: Type.Array(
              Type.Object({
                id: Type.Number(),
                date: Type.Number(),
                userId: Type.Number(),
                portfolioId: Type.Number(),
                shareId: Type.Number(),
                rate: Type.Number(),
                quantity: Type.Number(),
                type: Type.String(),
              })
            ),
          }),
        },
      },
    },
    async (request) => {
      const retrieveAllTradesByShareAndUserUseCase =
        DiContainer.getDependency<RetrieveAllTradesByShareAndUserUseCase>(
          "RetrieveAllTradesByShareAndUserUseCase"
        );
      const retrieveAllTradesByShareUseCase =
        DiContainer.getDependency<RetrieveAllTradesByShareUseCase>(
          "RetrieveAllTradesByShareUseCase"
        );

      const { userId, shareId } = request.query;
      let trades: Trade[];

      if (userId) {
        trades = await retrieveAllTradesByShareAndUserUseCase.execute({
          shareId,
          userId,
        });
      } else {
        trades = await retrieveAllTradesByShareUseCase.execute({
          shareId,
        });
      }

      return {
        trades: TradeDTOMapper.toReadableTradeDTOList(trades),
      };
    }
  );

  fastify.post(
    "/trades/buy",
    {
      schema: {
        body: Type.Object({
          userId: Type.Number(),
          portfolioId: Type.Number(),
          shareId: Type.Number(),
          quantity: Type.Number(),
        }),
        response: {
          200: Type.Object({
            id: Type.Number(),
            date: Type.Number(),
            userId: Type.Number(),
            portfolioId: Type.Number(),
            shareId: Type.Number(),
            rate: Type.Number(),
            quantity: Type.Number(),
            type: Type.String(),
          }),
        },
      },
    },
    async (request) => {
      const buyShareTradeUseCase =
        DiContainer.getDependency<BuyShareTradeUseCase>("BuyShareTradeUseCase");

      const { portfolioId, shareId, quantity, userId } = request.body;

      const trade = await buyShareTradeUseCase.execute({
        portfolioId,
        shareId,
        quantity,
        userId,
      });

      return TradeDTOMapper.toReadableTradeDTO(trade);
    }
  );

  fastify.post(
    "/trades/sell",
    {
      schema: {
        body: Type.Object({
          userId: Type.Number(),
          portfolioId: Type.Number(),
          shareId: Type.Number(),
          quantity: Type.Number(),
        }),
        response: {
          200: Type.Object({
            id: Type.Number(),
            date: Type.Number(),
            userId: Type.Number(),
            portfolioId: Type.Number(),
            shareId: Type.Number(),
            rate: Type.Number(),
            quantity: Type.Number(),
            type: Type.String(),
          }),
        },
      },
    },
    async (request) => {
      const sellShareTradeUseCase =
        DiContainer.getDependency<SellShareTradeUseCase>("SellShareTradeUseCase");

      const { portfolioId, shareId, quantity, userId } = request.body;

      const trade = await sellShareTradeUseCase.execute({
        portfolioId,
        shareId,
        quantity,
        userId,
      });

      return TradeDTOMapper.toReadableTradeDTO(trade);
    }
  );

};

export default plugin;

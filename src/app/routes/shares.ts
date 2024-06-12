import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import { DiContainer } from "../../infra/DiContainer";
import { RetrieveAllSharesUseCase } from "../../domain/share/ports/in/share/RetrieveAllSharesUseCase";
import { ShareDTOMapper } from "../mappers/ShareDTOMapper";
import { RetrieveShareBySymbolUseCase } from "../../domain/share/ports/in/share/RetrieveShareBySymbolUseCase";
import { RetrieveShareByIdUseCase } from "../../domain/share/ports/in/share/RetrieveShareByIdUseCase";
import { CreateShareUseCase } from "../../domain/share/ports/in/share/CreateShareUseCase";
import { CreateShareRateUpdateUseCase } from "../../domain/share/ports/in/shareRateUpdate/CreateShareUpdateUseCase";

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "/shares",
    {
      schema: {
        response: {
          200: Type.Object({
            shares: Type.Array(
              Type.Object({
                id: Type.Number(),
                symbol: Type.String(),
                rate: Type.Number(),
                shareRateUpdates: Type.Array(
                  Type.Object({
                    rate: Type.Number(),
                    date: Type.Number(),
                    userId: Type.Optional(Type.Number()),
                    isSystemUpdate: Type.Optional(Type.Boolean()),
                  })
                ),
              })
            ),
          }),
        },
      },
    },
    async () => {
      const retrieveAllSharesUseCase =
        DiContainer.getDependency<RetrieveAllSharesUseCase>(
          "RetrieveAllSharesUseCase"
        );

      const shares = await retrieveAllSharesUseCase.execute({});

      return {
        shares: ShareDTOMapper.toReadableShareDTOList(shares),
      };
    }
  );

  fastify.get(
    "/shares/symbol/:symbol",
    {
      schema: {
        params: Type.Object({
          symbol: Type.String(),
        }),
        response: {
          200: Type.Object({
            id: Type.Number(),
            symbol: Type.String(),
            rate: Type.Number(),
            shareRateUpdates: Type.Array(
              Type.Object({
                rate: Type.Number(),
                date: Type.Number(),
                userId: Type.Optional(Type.Number()),
                isSystemUpdate: Type.Optional(Type.Boolean()),
              })
            ),
          }),
        },
      },
    },
    async (request) => {
      const retrieveShareBySymbolUseCase =
        DiContainer.getDependency<RetrieveShareBySymbolUseCase>(
          "RetrieveShareBySymbolUseCase"
        );
      const { symbol } = request.params;

      const share = await retrieveShareBySymbolUseCase.execute({
        symbol,
      });

      return ShareDTOMapper.toReadableShareDTO(share);
    }
  );

  fastify.get(
    "/shares/id/:id",
    {
      schema: {
        params: Type.Object({
          id: Type.Number(),
        }),
        response: {
          200: Type.Object({
            id: Type.Number(),
            symbol: Type.String(),
            rate: Type.Number(),
            shareRateUpdates: Type.Array(
              Type.Object({
                rate: Type.Number(),
                date: Type.Number(),
                userId: Type.Optional(Type.Number()),
                isSystemUpdate: Type.Optional(Type.Boolean()),
              })
            ),
          }),
        },
      },
    },
    async (request) => {
      const retrieveShareByIdUseCase =
        DiContainer.getDependency<RetrieveShareByIdUseCase>(
          "RetrieveShareByIdUseCase"
        );
      const { id } = request.params;

      const share = await retrieveShareByIdUseCase.execute({
        id,
      });

      return ShareDTOMapper.toReadableShareDTO(share);
    }
  );

  fastify.post(
    "/shares",
    {
      schema: {
        body: Type.Object({
          symbol: Type.String(),
          rate: Type.Number(),
        }),
        response: {
          200: Type.Object({
            id: Type.Number(),
            symbol: Type.String(),
            rate: Type.Number(),
            shareRateUpdates: Type.Array(
              Type.Object({
                rate: Type.Number(),
                date: Type.Number(),
                userId: Type.Optional(Type.Number()),
                isSystemUpdate: Type.Optional(Type.Boolean()),
              })
            ),
          }),
        },
      },
    },
    async (request) => {
      const createShareUseCase =
        DiContainer.getDependency<CreateShareUseCase>("CreateShareUseCase");

      const { symbol, rate } = request.body;

      const share = await createShareUseCase.execute({ symbol, rate });

      return ShareDTOMapper.toReadableShareDTO(share);
    }
  );

  fastify.put(
    "/shares/update-rate",
    {
      schema: {
        body: Type.Object({
          shareId: Type.Number(),
          rate: Type.Number(),
          userId: Type.Number(),
        }),
        response: {
          200: Type.Object({
            rate: Type.Number(),
            date: Type.Number(),
            userId: Type.Optional(Type.Number()),
            isSystemUpdate: Type.Optional(Type.Boolean()),
          }),
        },
      },
    },
    async (request) => {
      const createShareRateUpdateUseCase =
        DiContainer.getDependency<CreateShareRateUpdateUseCase>(
          "CreateShareRateUpdateUseCase"
        );

      const { shareId, userId, rate } = request.body;

      const shareRateUpdate = await createShareRateUpdateUseCase.execute({
        shareId,
        userId,
        rate,
      });

      return ShareDTOMapper.toReadableShareRateDTO(shareRateUpdate);
    }
  );
};

export default plugin;

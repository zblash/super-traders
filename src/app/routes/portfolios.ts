import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import { DiContainer } from "../../infra/DiContainer";
import { RetrieveAllPortfoliosByUserUseCase } from "../../domain/portfolio/ports/in/RetrieveAllPortfoliosByUserUseCase";
import { PortfolioDTOMapper } from "../mappers/PortfolioDTOMapper";
import { RetrievePortfolioByIdUseCase } from "../../domain/portfolio/ports/in/RetrievePortfolioByIdUseCase";
import { CreatePortfolioUseCase } from "../../domain/portfolio/ports/in/CreatePortfolioUseCase";

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "/portfolios",
    {
      schema: {
        querystring: Type.Object({
          userId: Type.Number(),
        }),
        response: {
          200: Type.Object({
            portofolios: Type.Array(
              Type.Object({
                id: Type.Number(),
                name: Type.String(),
                userId: Type.Number(),
                shareItems: Type.Array(
                  Type.Object({
                    shareSymbol: Type.String(),
                    portfolioId: Type.Number(),
                    quantity: Type.Number(),
                  })
                ),
              })
            ),
          }),
        },
      },
    },
    async (request) => {
      const retrieveAllPortfoliosByUserUseCase =
        DiContainer.getDependency<RetrieveAllPortfoliosByUserUseCase>(
          "RetrieveAllPortfoliosByUserUseCase"
        );

      const { userId } = request.query;

      const portofolios = await retrieveAllPortfoliosByUserUseCase.execute({
        userId,
      });

      return {
        portofolios: PortfolioDTOMapper.toReadablePortfolioDTOList(portofolios),
      };
    }
  );

  fastify.get(
    "/portfolios/:portfolioId",
    {
      schema: {
        params: Type.Object({
          portfolioId: Type.Number(),
        }),
        querystring: Type.Object({
          userId: Type.Number(),
        }),
        response: {
          200: Type.Object({
            id: Type.Number(),
            name: Type.String(),
            userId: Type.Number(),
            shareItems: Type.Array(
              Type.Object({
                shareSymbol: Type.String(),
                portfolioId: Type.Number(),
                quantity: Type.Number(),
              })
            ),
          }),
        },
      },
    },
    async (request) => {
      const retrievePortfolioByIdUseCase =
        DiContainer.getDependency<RetrievePortfolioByIdUseCase>(
          "RetrievePortfolioByIdUseCase"
        );

      const { userId } = request.query;
      const { portfolioId } = request.params;

      const portofolio = await retrievePortfolioByIdUseCase.execute({
        userId,
        portfolioId,
      });

      return PortfolioDTOMapper.toReadablePortfolioDTO(portofolio);
    }
  );

  fastify.post(
    "/portfolios",
    {
      schema: {
        body: Type.Object({
          name: Type.String(),
          userId: Type.Number(),
        }),
        response: {
          200: Type.Object({
            id: Type.Number(),
            name: Type.String(),
            userId: Type.Number(),
            shareItems: Type.Array(
              Type.Object({
                shareSymbol: Type.String(),
                portfolioId: Type.Number(),
                quantity: Type.Number(),
              })
            ),
          }),
        },
      },
    },
    async (request) => {
      const createPortfolioUseCase =
        DiContainer.getDependency<CreatePortfolioUseCase>(
          "CreatePortfolioUseCase"
        );

      const { name, userId } = request.body;

      const portofolio = await createPortfolioUseCase.execute({
        name,
        userId,
      });

      return PortfolioDTOMapper.toReadablePortfolioDTO(portofolio);
    }
  );
};

export default plugin;

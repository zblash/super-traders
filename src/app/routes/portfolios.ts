import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import { DiContainer } from "../../infra/DiContainer";
import { RetrieveAllPortfoliosByUserUseCase } from "../../domain/portfolio/ports/in/RetrieveAllPortfoliosByUserUseCase";

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
            hello: Type.String(),
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
      try {
      const prts = await retrieveAllPortfoliosByUserUseCase.execute({
        userId: userId,
      });
      console.log("PORTFOLIOS",prts);

    } catch (error) {
      console.log(error);
    }
      return {hello: "word"};
    }
  );
};

export default plugin;

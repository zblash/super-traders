import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import { DiContainer } from "../../infra/DiContainer";
import { RetrieveAllUsersUseCase } from "../../domain/user/ports/in/RetrieveAllUsersUseCase";
import { UserDTOMapper } from "../mappers/UserDTOMapper";
import { RetrieveUserByIdUseCase } from "../../domain/user/ports/in/RetrieveUserByIdUseCase";
import { CreateUserUseCase } from "../../domain/user/ports/in/CreateUserUseCase";
import { UpdateUserUseCase } from "../../domain/user/ports/in/UpdateUserUseCase";

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "/users",
    {
      schema: {
        response: {
          200: Type.Object({
            users: Type.Array(
              Type.Object({
                id: Type.Number(),
                name: Type.String(),
                email: Type.String(),
              })
            ),
          }),
        },
      },
    },
    async (request) => {
      const retrieveAllUsersUseCase =
        DiContainer.getDependency<RetrieveAllUsersUseCase>(
          "RetrieveAllUsersUseCase"
        );

      const users = await retrieveAllUsersUseCase.execute({});

      return {
        users: UserDTOMapper.toReadableUserDTOList(users),
      };
    }
  );

  fastify.get(
    "/users/:id",
    {
      schema: {
        params: Type.Object({
          id: Type.Number(),
        }),
        response: {
          200: Type.Object({
            id: Type.Number(),
            name: Type.String(),
            email: Type.String(),
          }),
        },
      },
    },
    async (request) => {
      const retrieveUserByIdUseCase =
        DiContainer.getDependency<RetrieveUserByIdUseCase>(
          "RetrieveUserByIdUseCase"
        );

      const { id } = request.params;

      const user = await retrieveUserByIdUseCase.execute({
        id,
      });

      return UserDTOMapper.toReadableUserDTO(user);
    }
  );

  fastify.post(
    "/users",
    {
      schema: {
        body: Type.Object({
          name: Type.String(),
          email: Type.String(),
        }),
        response: {
          200: Type.Object({
            id: Type.Number(),
            name: Type.String(),
            email: Type.String(),
          }),
        },
      },
    },
    async (request) => {
      const createUserUseCase =
        DiContainer.getDependency<CreateUserUseCase>("CreateUserUseCase");

      const { name, email } = request.body;

      const user = await createUserUseCase.execute({
        name,
        email,
      });

      return UserDTOMapper.toReadableUserDTO(user);
    }
  );

  fastify.put(
    "/users",
    {
      schema: {
        body: Type.Object({
          id: Type.Number(),
          name: Type.String(),
          email: Type.String(),
        }),
        response: {
          200: Type.Object({
            id: Type.Number(),
            name: Type.String(),
            email: Type.String(),
          }),
        },
      },
    },
    async (request) => {
      const updateUserUseCase =
        DiContainer.getDependency<UpdateUserUseCase>("UpdateUserUseCase");

      const { id, name, email } = request.body;

      const user = await updateUserUseCase.execute({
        id,
        name,
        email,
      });

      return UserDTOMapper.toReadableUserDTO(user);
    }
  );
};

export default plugin;

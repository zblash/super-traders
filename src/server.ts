import fastify from "fastify";
import AutoLoad from "@fastify/autoload";
import { DiContainer } from "./infra/DiContainer";
import { DomainError } from "./domain/common/error/DomainError";

DiContainer.createDiContainer();

const server = fastify();

server.register(AutoLoad, {
  dir: `${__dirname}/app/routes`,
});

server.setErrorHandler((error, request, reply) => {
  console.log(error);
  if (error instanceof DomainError) {
    return reply.status(400).send({
      error: error.message,
    });
  } else {
    return reply.status(500).send({
      error: "Internal Server Error",
    });
  }
});

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

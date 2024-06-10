import fastify from "fastify";
import AutoLoad from "@fastify/autoload";
import { DiContainer } from "./infra/DiContainer";

DiContainer.createDiContainer();

const server = fastify();

server.register(AutoLoad, {
  dir: `${__dirname}/app/routes`,
});

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

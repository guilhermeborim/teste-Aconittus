import fastify from "fastify";
import { personRoutes } from "./routes/routes.js";

const server = fastify();

server.register(personRoutes, { prefix: "/person" });

server.listen({
  port: 3333,
});

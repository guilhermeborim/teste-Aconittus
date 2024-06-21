import cors from "@fastify/cors";
import fastify from "fastify";
import { personRoutes } from "./routes/routes.js";
const server = fastify();

const start = async () => {
  await server.register(cors);
  await server.register(personRoutes, { prefix: "/person" });
  try {
    await server.listen({ port: 3333 });
  } catch (err) {
    process.exit(1);
  }
};

start();

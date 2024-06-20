import { DatabasePostgres } from "../database/database-postgres.js";

export async function personRoutes(fastify) {
  const database = new DatabasePostgres();

  fastify.post("/", async (request, reply) => {
    const { name, road, number, neighborhood, city, state } = request.body;

    try {
      await database.create({
        name,
        road,
        number,
        neighborhood,
        city,
        state,
      });
      return reply.send({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
      return reply.send({ message: "Erro ao cadastrar o usuário!" });
    }
  });

  fastify.get("/", async (request, reply) => {
    const search = request.query.search;

    try {
      const persons = await database.list(search);
      return reply.send(persons);
    } catch {
      return reply.send({ message: "Erro ao listar os usuários cadastrados!" });
    }
  });
}

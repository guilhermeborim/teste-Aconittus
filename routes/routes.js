import { DatabasePostgres } from "../database/database-postgres.js";

export async function personRoutes(fastify) {
  const database = new DatabasePostgres();

  // Rota para cadastrar um novo usuário
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
      return reply
        .status(201)
        .send({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
      return reply.send({ message: "Erro ao cadastrar o usuário!" });
    }
  });

  // Rota para listar os usuários cadastrados
  fastify.get("/", async (request, reply) => {
    const search = request.query.search;

    try {
      const persons = await database.list(search);
      if (persons.length === 0) {
        return reply.send({ message: "Nenhum usuário cadastrado!" });
      }
      return reply.send(persons);
    } catch {
      return reply.send({ message: "Erro ao listar os usuários cadastrados!" });
    }
  });

  // Rota para buscar um usuário pelo ID
  fastify.put("/:id", async (request, reply) => {
    const personId = request.params.id;
    const { name, road, number, neighborhood, city, state } = request.body;

    try {
      await database.update(personId, {
        name,
        road,
        number,
        neighborhood,
        city,
        state,
      });
      return reply.send({ message: "Usuário atualizado com sucesso!" });
    } catch {
      return reply.send({ message: "Erro ao atualizar o usuário!" });
    }
  });

  // Rota para deletar um usuário pelo ID
  fastify.delete("/:id", async (request, reply) => {
    const personId = request.params.id;

    try {
      await database.delete(personId);
      return reply.send({ message: "Usuário deletado com sucesso!" });
    } catch {
      return reply.send({ message: "Erro ao deletar o usuário!" });
    }
  });
}

import { DatabasePostgres } from "../database/database-postgres.js";
import { validatePerson } from "../utils/validation.js";

export async function personRoutes(fastify) {
  const database = new DatabasePostgres();

  // Rota para cadastrar um novo usuário
  fastify.post("/", async (request, reply) => {
    const person = request.body;

    const validationResult = validatePerson(person);

    if (!validationResult.isValid) {
      return reply.status(400).send({ message: validationResult.message });
    }
    try {
      await database.create(person);
      return reply
        .status(201)
        .send({ message: "Usuário cadastrado com sucesso!" });
    } catch {
      return reply
        .status(500)
        .send({ message: "Erro ao cadastrar o usuário!" });
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
      return reply
        .status(500)
        .send({ message: "Erro ao listar os usuários cadastrados!" });
    }
  });

  // Rota para atualizar um usuário pelo ID
  fastify.put("/:id", async (request, reply) => {
    const personId = request.params.id;
    const person = request.body;
    const validationResult = validatePerson(person);

    if (!validationResult.isValid) {
      return reply.status(400).send({ message: validationResult.message });
    }

    try {
      const existingPerson = await database.get(personId);
      if (!existingPerson) {
        return reply.status(404).send({ message: "Usuário não encontrado!" });
      }

      await database.update(personId, person);
      return reply.send({ message: "Usuário atualizado com sucesso!" });
    } catch {
      return reply
        .status(500)
        .send({ message: "Erro ao atualizar o usuário!" });
    }
  });

  // Rota para deletar um usuário pelo ID
  fastify.delete("/:id", async (request, reply) => {
    const personId = request.params.id;

    try {
      const person = await database.get(personId);
      if (!person) {
        return reply.status(404).send({ message: "Usuário não encontrado!" });
      }

      await database.delete(personId);
      return reply.send({ message: "Usuário deletado com sucesso!" });
    } catch {
      return reply.status(500).send({ message: "Erro ao deletar o usuário!" });
    }
  });
}

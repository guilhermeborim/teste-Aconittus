import { randomUUID } from "node:crypto";
import { sql } from "./db.js";
export class DatabasePostgres {
  async list(search) {
    let persons;

    if (search) {
      persons = await sql`SELECT * FROM person WHERE name ILIKE ${
        "%" + search + "%"
      }`;
    } else {
      persons = await sql`SELECT * FROM person`;
    }

    return persons;
  }

  async create(person) {
    const personId = randomUUID();
    const { name, road, number, neighborhood, city, state } = person;

    await sql`INSERT INTO person (id, name, road, number, neighborhood, city, state) VALUES (${personId}, ${name}, ${road}, ${number}, ${neighborhood}, ${city}, ${state})`;
  }

  async update(id, person) {
    const { name, road, number, neighborhood, city, state } = person;

    await sql`UPDATE person SET name = ${name}, road = ${road}, number = ${number}, neighborhood = ${neighborhood}, city = ${city}, state = ${state} WHERE id = ${id}`;
  }

  async delete(id) {
    await sql`DELETE FROM person WHERE id = ${id}`;
  }
}

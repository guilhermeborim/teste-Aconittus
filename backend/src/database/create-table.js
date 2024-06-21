import { sql } from "./db.js";

sql`
  CREATE TABLE person (
    id TEXT PRIMARY KEY,
    name TEXT,
    road TEXT,
    number INTEGER,
    neighborhood TEXT,
    city TEXT,
    state TEXT
  );
`.then(() => {
  console.log("Tabela criada com sucesso");
});

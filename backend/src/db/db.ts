import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "odin-chat",
  password: "postgres",
  port: 5432,
});

// Testar conexão
pool.on("connect", () => {
  console.log("🐘 Base de dados conectada com sucesso!");
});

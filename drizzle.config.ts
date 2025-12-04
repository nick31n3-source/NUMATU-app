import { defineConfig } from "drizzle-kit";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required to run drizzle commands");
}

// Detectar automaticamente o tipo de banco de dados baseado na URL
const isPostgreSQL = connectionString.startsWith("postgresql://") || connectionString.startsWith("postgres://");
const isMySQL = connectionString.startsWith("mysql://") || connectionString.startsWith("mysql2://");

if (!isPostgreSQL && !isMySQL) {
  throw new Error("DATABASE_URL deve começar com 'postgresql://', 'postgres://', 'mysql://' ou 'mysql2://'");
}

const dialect = isPostgreSQL ? "postgresql" : "mysql";

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: dialect,
  ...(isPostgreSQL && {
    migrations: {
      table: "__drizzle_migrations__",
      schema: "public",
    },
  }),
  dbCredentials: {
    url: connectionString,
  },
});

import * as pgCore from "drizzle-orm/pg-core";
import * as mysqlCore from "drizzle-orm/mysql-core";

const { pgEnum, pgTable, text: pgText, timestamp: pgTimestamp, varchar: pgVarchar, integer: pgInteger } = pgCore;
const { mysqlEnum, mysqlTable, text: mysqlText, timestamp: mysqlTimestamp, varchar: mysqlVarchar, int: mysqlInt } = mysqlCore;

// Detectar o tipo de banco de dados
const isPostgreSQL = process.env.DATABASE_URL?.startsWith("postgresql://") || process.env.DATABASE_URL?.startsWith("postgres://");

// Funções auxiliares para criar tabelas
const createTable = isPostgreSQL ? pgTable : mysqlTable;
const createEnum = isPostgreSQL ? pgEnum : mysqlEnum;
const createText = isPostgreSQL ? pgText : mysqlText;
const createTimestamp = isPostgreSQL ? pgTimestamp : mysqlTimestamp;
const createVarchar = isPostgreSQL ? pgVarchar : mysqlVarchar;

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = createTable("users", {
  id: isPostgreSQL
    ? pgInteger("id").primaryKey().generatedAlwaysAsIdentity()
    : mysqlInt("id").autoincrement().primaryKey(),
  openId: createVarchar("openId", { length: 64 }).notNull().unique(),
  name: createText("name"),
  email: createVarchar("email", { length: 320 }),
  loginMethod: createVarchar("loginMethod", { length: 64 }),
  role: createEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: createTimestamp("createdAt", { withTimezone: isPostgreSQL }).defaultNow().notNull(),
  updatedAt: createTimestamp("updatedAt", { withTimezone: isPostgreSQL }).defaultNow().notNull(),
  lastSignedIn: createTimestamp("lastSignedIn", { withTimezone: isPostgreSQL }).defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Partners table for companies, collectors, and buyers interested in NUMATU
 */
export const partners = createTable("partners", {
  id: isPostgreSQL
    ? pgInteger("id").primaryKey().generatedAlwaysAsIdentity()
    : mysqlInt("id").autoincrement().primaryKey(),
  name: createVarchar("name", { length: 255 }).notNull(),
  email: createVarchar("email", { length: 320 }).notNull(),
  phone: createVarchar("phone", { length: 20 }),
  partnerType: createEnum("partnerType", ["company", "collector", "buyer"]).notNull(),
  companyName: createVarchar("companyName", { length: 255 }),
  city: createVarchar("city", { length: 100 }),
  state: createVarchar("state", { length: 2 }),
  message: createText("message"),
  whatsappNumber: createVarchar("whatsappNumber", { length: 20 }),
  createdAt: createTimestamp("createdAt", { withTimezone: isPostgreSQL }).defaultNow().notNull(),
  updatedAt: createTimestamp("updatedAt", { withTimezone: isPostgreSQL }).defaultNow().notNull(),
});

export type Partner = typeof partners.$inferSelect;
export type InsertPartner = typeof partners.$inferInsert;

/**
 * Collection points table for mapping optimal collection locations
 */
export const collectionPoints = createTable("collectionPoints", {
  id: isPostgreSQL
    ? pgInteger("id").primaryKey().generatedAlwaysAsIdentity()
    : mysqlInt("id").autoincrement().primaryKey(),
  name: createVarchar("name", { length: 255 }).notNull(),
  latitude: createVarchar("latitude", { length: 50 }).notNull(),
  longitude: createVarchar("longitude", { length: 50 }).notNull(),
  address: createText("address"),
  city: createVarchar("city", { length: 100 }).notNull(),
  state: createVarchar("state", { length: 2 }).notNull(),
  description: createText("description"),
  createdAt: createTimestamp("createdAt", { withTimezone: isPostgreSQL }).defaultNow().notNull(),
  updatedAt: createTimestamp("updatedAt", { withTimezone: isPostgreSQL }).defaultNow().notNull(),
});

export type CollectionPoint = typeof collectionPoints.$inferSelect;
export type InsertCollectionPoint = typeof collectionPoints.$inferInsert;

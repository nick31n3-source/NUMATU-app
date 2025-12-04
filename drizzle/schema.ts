import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
  mysqlEnum,
  mysqlTable,
  int,
  mysqlTimestamp,
} from "drizzle-orm/mysql-core";
import {
  integer as pgInteger,
  pgEnum as pgEnumType,
  pgTable as pgTableType,
  text as pgText,
  timestamp as pgTimestamp,
  varchar as pgVarchar,
} from "drizzle-orm/pg-core";

// Detectar o tipo de banco de dados
const isPostgreSQL = process.env.DATABASE_URL?.startsWith("postgresql://") || process.env.DATABASE_URL?.startsWith("postgres://");

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = isPostgreSQL
  ? pgTableType("users", {
      id: pgInteger("id").primaryKey().generatedAlwaysAsIdentity(),
      openId: pgVarchar("openId", { length: 64 }).notNull().unique(),
      name: pgText("name"),
      email: pgVarchar("email", { length: 320 }),
      loginMethod: pgVarchar("loginMethod", { length: 64 }),
      role: pgEnumType("role", ["user", "admin"]).default("user").notNull(),
      createdAt: pgTimestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
      updatedAt: pgTimestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
      lastSignedIn: pgTimestamp("lastSignedIn", { withTimezone: true }).defaultNow().notNull(),
    })
  : mysqlTable("users", {
      id: int("id").autoincrement().primaryKey(),
      openId: varchar("openId", { length: 64 }).notNull().unique(),
      name: text("name"),
      email: varchar("email", { length: 320 }),
      loginMethod: varchar("loginMethod", { length: 64 }),
      role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
      createdAt: mysqlTimestamp("createdAt").defaultNow().notNull(),
      updatedAt: mysqlTimestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
      lastSignedIn: mysqlTimestamp("lastSignedIn").defaultNow().notNull(),
    });

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Partners table for companies, collectors, and buyers interested in NUMATU
 */
export const partners = isPostgreSQL
  ? pgTableType("partners", {
      id: pgInteger("id").primaryKey().generatedAlwaysAsIdentity(),
      name: pgVarchar("name", { length: 255 }).notNull(),
      email: pgVarchar("email", { length: 320 }).notNull(),
      phone: pgVarchar("phone", { length: 20 }),
      partnerType: pgEnumType("partnerType", ["company", "collector", "buyer"]).notNull(),
      companyName: pgVarchar("companyName", { length: 255 }),
      city: pgVarchar("city", { length: 100 }),
      state: pgVarchar("state", { length: 2 }),
      message: pgText("message"),
      whatsappNumber: pgVarchar("whatsappNumber", { length: 20 }),
      createdAt: pgTimestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
      updatedAt: pgTimestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
    })
  : mysqlTable("partners", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 255 }).notNull(),
      email: varchar("email", { length: 320 }).notNull(),
      phone: varchar("phone", { length: 20 }),
      partnerType: mysqlEnum("partnerType", ["company", "collector", "buyer"]).notNull(),
      companyName: varchar("companyName", { length: 255 }),
      city: varchar("city", { length: 100 }),
      state: varchar("state", { length: 2 }),
      message: text("message"),
      whatsappNumber: varchar("whatsappNumber", { length: 20 }),
      createdAt: mysqlTimestamp("createdAt").defaultNow().notNull(),
      updatedAt: mysqlTimestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
    });

export type Partner = typeof partners.$inferSelect;
export type InsertPartner = typeof partners.$inferInsert;

/**
 * Collection points table for mapping optimal collection locations
 */
export const collectionPoints = isPostgreSQL
  ? pgTableType("collectionPoints", {
      id: pgInteger("id").primaryKey().generatedAlwaysAsIdentity(),
      name: pgVarchar("name", { length: 255 }).notNull(),
      latitude: pgVarchar("latitude", { length: 50 }).notNull(),
      longitude: pgVarchar("longitude", { length: 50 }).notNull(),
      address: pgText("address"),
      city: pgVarchar("city", { length: 100 }).notNull(),
      state: pgVarchar("state", { length: 2 }).notNull(),
      description: pgText("description"),
      createdAt: pgTimestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
      updatedAt: pgTimestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
    })
  : mysqlTable("collectionPoints", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 255 }).notNull(),
      latitude: varchar("latitude", { length: 50 }).notNull(),
      longitude: varchar("longitude", { length: 50 }).notNull(),
      address: text("address"),
      city: varchar("city", { length: 100 }).notNull(),
      state: varchar("state", { length: 2 }).notNull(),
      description: text("description"),
      createdAt: mysqlTimestamp("createdAt").defaultNow().notNull(),
      updatedAt: mysqlTimestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
    });

export type CollectionPoint = typeof collectionPoints.$inferSelect;
export type InsertCollectionPoint = typeof collectionPoints.$inferInsert;

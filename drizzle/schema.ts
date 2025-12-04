import {
  pgEnum,
  pgTable,
  text as pgText,
  timestamp as pgTimestamp,
  varchar as pgVarchar,
  integer as pgInteger,
} from "drizzle-orm/pg-core";
import {
  mysqlEnum,
  mysqlTable,
  text as mysqlText,
  mysqlTimestamp,
  varchar as mysqlVarchar,
  int as mysqlInt,
} from "drizzle-orm/mysql-core";

// Detectar o tipo de banco de dados
const isPostgreSQL = process.env.DATABASE_URL?.startsWith("postgresql://") || process.env.DATABASE_URL?.startsWith("postgres://");

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = isPostgreSQL
  ? pgTable("users", {
      id: pgInteger("id").primaryKey().generatedAlwaysAsIdentity(),
      openId: pgVarchar("openId", { length: 64 }).notNull().unique(),
      name: pgText("name"),
      email: pgVarchar("email", { length: 320 }),
      loginMethod: pgVarchar("loginMethod", { length: 64 }),
      role: pgEnum("role", ["user", "admin"]).default("user").notNull(),
      createdAt: pgTimestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
      updatedAt: pgTimestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
      lastSignedIn: pgTimestamp("lastSignedIn", { withTimezone: true }).defaultNow().notNull(),
    })
  : mysqlTable("users", {
      id: mysqlInt("id").autoincrement().primaryKey(),
      openId: mysqlVarchar("openId", { length: 64 }).notNull().unique(),
      name: mysqlText("name"),
      email: mysqlVarchar("email", { length: 320 }),
      loginMethod: mysqlVarchar("loginMethod", { length: 64 }),
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
  ? pgTable("partners", {
      id: pgInteger("id").primaryKey().generatedAlwaysAsIdentity(),
      name: pgVarchar("name", { length: 255 }).notNull(),
      email: pgVarchar("email", { length: 320 }).notNull(),
      phone: pgVarchar("phone", { length: 20 }),
      partnerType: pgEnum("partnerType", ["company", "collector", "buyer"]).notNull(),
      companyName: pgVarchar("companyName", { length: 255 }),
      city: pgVarchar("city", { length: 100 }),
      state: pgVarchar("state", { length: 2 }),
      message: pgText("message"),
      whatsappNumber: pgVarchar("whatsappNumber", { length: 20 }),
      createdAt: pgTimestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
      updatedAt: pgTimestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
    })
  : mysqlTable("partners", {
      id: mysqlInt("id").autoincrement().primaryKey(),
      name: mysqlVarchar("name", { length: 255 }).notNull(),
      email: mysqlVarchar("email", { length: 320 }).notNull(),
      phone: mysqlVarchar("phone", { length: 20 }),
      partnerType: mysqlEnum("partnerType", ["company", "collector", "buyer"]).notNull(),
      companyName: mysqlVarchar("companyName", { length: 255 }),
      city: mysqlVarchar("city", { length: 100 }),
      state: mysqlVarchar("state", { length: 2 }),
      message: mysqlText("message"),
      whatsappNumber: mysqlVarchar("whatsappNumber", { length: 20 }),
      createdAt: mysqlTimestamp("createdAt").defaultNow().notNull(),
      updatedAt: mysqlTimestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
    });

export type Partner = typeof partners.$inferSelect;
export type InsertPartner = typeof partners.$inferInsert;

/**
 * Collection points table for mapping optimal collection locations
 */
export const collectionPoints = isPostgreSQL
  ? pgTable("collectionPoints", {
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
      id: mysqlInt("id").autoincrement().primaryKey(),
      name: mysqlVarchar("name", { length: 255 }).notNull(),
      latitude: mysqlVarchar("latitude", { length: 50 }).notNull(),
      longitude: mysqlVarchar("longitude", { length: 50 }).notNull(),
      address: mysqlText("address"),
      city: mysqlVarchar("city", { length: 100 }).notNull(),
      state: mysqlVarchar("state", { length: 2 }).notNull(),
      description: mysqlText("description"),
      createdAt: mysqlTimestamp("createdAt").defaultNow().notNull(),
      updatedAt: mysqlTimestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
    });

export type CollectionPoint = typeof collectionPoints.$inferSelect;
export type InsertCollectionPoint = typeof collectionPoints.$inferInsert;

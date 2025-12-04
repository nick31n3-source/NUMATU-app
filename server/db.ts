import { eq } from "drizzle-orm";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import { drizzle as drizzleMySQL } from "drizzle-orm/mysql2";
import postgres from "postgres";
import mysql from "mysql2/promise";
import { InsertUser, users, partners, InsertPartner, collectionPoints } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: any = null;
let _client: any = null;
let _dbType: "postgresql" | "mysql" | null = null;

// Detectar o tipo de banco de dados baseado na URL
function detectDatabaseType(): "postgresql" | "mysql" {
  const url = process.env.DATABASE_URL || "";
  if (url.startsWith("postgresql://") || url.startsWith("postgres://")) {
    return "postgresql";
  }
  if (url.startsWith("mysql://") || url.startsWith("mysql2://")) {
    return "mysql";
  }
  throw new Error("DATABASE_URL deve começar com 'postgresql://', 'postgres://', 'mysql://' ou 'mysql2://'");
}

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _dbType = detectDatabaseType();

      if (_dbType === "postgresql") {
        _client = postgres(process.env.DATABASE_URL);
        _db = drizzlePostgres(_client);
      } else if (_dbType === "mysql") {
        _client = await mysql.createPool(process.env.DATABASE_URL);
        _db = drizzleMySQL(_client);
      }
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
      _client = null;
      _dbType = null;
    }
  }
  return _db;
}

export async function closeDb() {
  if (_client) {
    try {
      if (_dbType === "postgresql") {
        await _client.end();
      } else if (_dbType === "mysql") {
        await _client.end();
      }
    } catch (error) {
      console.warn("[Database] Failed to close connection:", error);
    }
    _client = null;
    _db = null;
    _dbType = null;
  }
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    // Usar o método apropriado para cada banco de dados
    if (_dbType === "postgresql") {
      await db.insert(users).values(values).onConflictDoUpdate({
        target: users.openId,
        set: updateSet,
      });
    } else if (_dbType === "mysql") {
      await db.insert(users).values(values).onDuplicateKeyUpdate({
        set: updateSet,
      });
    }
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createPartner(partner: InsertPartner) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create partner: database not available");
    return undefined;
  }

  try {
    const result = await db.insert(partners).values(partner).returning();
    return result;
  } catch (error) {
    console.error("[Database] Failed to create partner:", error);
    throw error;
  }
}

export async function getCollectionPoints() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get collection points: database not available");
    return [];
  }

  try {
    const result = await db.select().from(collectionPoints);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get collection points:", error);
    return [];
  }
}

export async function getPartnersByType(partnerType: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get partners: database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(partners)
      .where(eq(partners.partnerType, partnerType as any));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get partners:", error);
    return [];
  }
}

export async function getPartnerById(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get partner: database not available");
    return undefined;
  }

  try {
    const result = await db.select().from(partners).where(eq(partners.id, id)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get partner:", error);
    return undefined;
  }
}

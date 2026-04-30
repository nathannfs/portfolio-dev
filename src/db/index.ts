import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

// biome-ignore lint/performance/noNamespaceImport: drizzle requires schema namespace
import * as schema from "./schema"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export const db = drizzle(pool, { schema })

import "dotenv/config"

import { defineConfig } from "drizzle-kit"

import { env } from "@/env"

const databaseUrl = env.DATABASE_URL

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined")
}

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
})

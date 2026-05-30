import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

const connectionString = process.env.DATABASE_URL

function createDb() {
  if (!connectionString) {
    return null
  }
  const client = postgres(connectionString, {
    prepare: false,
    max: 1,
    connect_timeout: 5,
    idle_timeout: 10,
  })
  return drizzle(client, { schema })
}

export type Db = NonNullable<ReturnType<typeof createDb>>
export const db = createDb()

export function isDatabaseConfigured(): boolean {
  return Boolean(connectionString && db)
}

export * from "./schema"

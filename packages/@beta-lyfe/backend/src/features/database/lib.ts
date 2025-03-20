import { config } from '../config'
import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  connectionString: config.db.url
})

export const db = drizzle({ client: pool })

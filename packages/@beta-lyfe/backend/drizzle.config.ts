import { defineConfig } from 'drizzle-kit'
import { config } from './src/features/config'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/features/database/schema.ts',
  dbCredentials: {
    url: config.db.url
  }
})

import { z } from 'zod'

const EnvSchema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'test']),
  PORT: z.coerce.number().min(0).max(65535),
  HUDDLE01_API_KEY: z.string()
})

const env = EnvSchema.parse(process.env)

export const config = {
  huddle01: {
    apiKey: env.HUDDLE01_API_KEY
  },
  app: {
    port: env.PORT,
    environment: env.NODE_ENV
  }
}

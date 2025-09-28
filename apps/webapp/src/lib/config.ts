import { z } from 'zod'

const EnvSchema = z.object({
  NODE_ENV: z.union([z.literal('production'), z.literal('development')]),
})

const env = EnvSchema.parse({
  NODE_ENV: import.meta.env.MODE,
})

export const config = {
  app: {
    environment: env.NODE_ENV
  },
}

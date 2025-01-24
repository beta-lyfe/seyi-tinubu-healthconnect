import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

const ENV = import.meta.env ?? process.env

export const env = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_NODE_ENV: z
      .enum(['production', 'development', 'test'])
      .default('development'),
    VITE_HUDDLE01_PROJECT_ID: z.string()
  },
  server: { },
  runtimeEnv: {
    NODE_ENV: ENV.NODE_ENV,
    VITE_HUDDLE01_PROJECT_ID: ENV.VITE_HUDDLE01_PROJECT_ID,
  }
})

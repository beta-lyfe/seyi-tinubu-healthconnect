import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

const ENV = process.env

export const env = createEnv({
  clientPrefix: 'VITE_',
  client: {},
  server: {
    NODE_ENV: z
      .enum(['production', 'development', 'test'])
      .default('test'),
    BACKEND_URL: z.string().url()
  },
  runtimeEnv: {
    NODE_ENV: ENV.NODE_ENV,
    BACKEND_URL: ENV.BACKEND_URL
  }
})

import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

const ENV = (import.meta as any).env ?? process.env

export const env = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_NODE_ENV: z
      .enum(['production', 'development', 'test'])
      .default('development'),
      
    VITE_BACKEND_URL: z.string().url(),
    VITE_JITSI_APP_ID:z.string()
  },
  server: {},
  runtimeEnv: {
    NODE_ENV: ENV.NODE_ENV,
    VITE_BACKEND_URL: ENV.VITE_BACKEND_URL,
    VITE_JITSI_APP_ID:ENV.VITE_JITSI_APP_ID
  }
})

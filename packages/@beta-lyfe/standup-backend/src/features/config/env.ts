import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  clientPrefix: '',
  client: {},
  server: {
    NODE_ENV: z.enum(['production', 'development', 'test']),
    PORT: z.coerce.number().min(0).max(65535),
    DATABASE_URL: z.string().url(),
    DATABASE_PREFIX: z.string().optional(),
    MAIL_HOST: z.string(),
    MAIL_PORT: z.coerce.number().min(1).max(65535),
    MAIL_USERNAME: z.string().min(1),
    MAIL_PASSWORD: z.string().min(1),
    MEDIA_SERVER_URL: z.string().url(),
    AUTH_SERVER_URL: z.string().url(),
    BASE_URL: z.string().url()
  },
  /**
   * Makes sure you explicitly access **all** environment variables
   * from `server` and `client` in your `runtimeEnv`.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    MEDIA_SERVER_URL: process.env.MEDIA_SERVER_URL,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_PREFIX: process.env.DATABASE_PREFIX,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USERNAME: process.env.MAIL_USERNAME,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    AUTH_SERVER_URL: process.env.AUTH_SERVER_URL,
    BASE_URL: process.env.BASE_URL
  }
})

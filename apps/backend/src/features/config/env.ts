import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  clientPrefix: '',
  client: {},
  server: {
    NODE_ENV: z.enum(['production', 'staging', 'development', 'test']),
    PORT: z.coerce.number().min(0).max(65535),
    DATABASE_URL: z.string().url(),
    DATABASE_PREFIX: z.string().optional(),
    MEDIA_SERVER_URL: z.string().url(),
    AUTH_SERVER_URL: z.string().url(),
    MAIL_URL: z.string().url(),
    MAIL_SENDER_NAME: z.string(),
    MAIL_SENDER_EMAIL: z.string().email(),
    MAIL_SUPPORT_NAME: z.string(),
    MAIL_SUPPORT_EMAIL: z.string().email(),
    BASE_URL: z.string().url(),
    FRONTEND_WEBSITE_URL: z.string().url(),
    FRONTEND_WEBAPP_URL: z.string().url(),
    JITSI_APP_ID: z.string(),
    JITSI_PRIVATE_KEY: z.string(),
    JITSI_KID_ID: z.string()
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
    AUTH_SERVER_URL: process.env.AUTH_SERVER_URL,
    MAIL_URL: process.env.MAIL_URL,
    MAIL_SENDER_NAME: process.env.MAIL_SENDER_NAME,
    MAIL_SENDER_EMAIL: process.env.MAIL_SENDER_EMAIL,
    MAIL_SUPPORT_NAME: process.env.MAIL_SUPPORT_NAME,
    MAIL_SUPPORT_EMAIL: process.env.MAIL_SUPPORT_EMAIL,
    BASE_URL: process.env.BASE_URL,
    FRONTEND_WEBSITE_URL: process.env.FRONTEND_WEBSITE_URL,
    FRONTEND_WEBAPP_URL: process.env.FRONTEND_WEBAPP_URL,
    JITSI_APP_ID: process.env.JITSI_APP_ID,
    JITSI_PRIVATE_KEY: process.env.JITSI_PRIVATE_KEY,
    JITSI_KID_ID: process.env.JITSI_KID_ID
  }
})

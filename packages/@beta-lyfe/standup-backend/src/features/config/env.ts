import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

// config({ path: `.env.${process.env.NODE_ENV}.local` })

export const env = createEnv({
  clientPrefix: '',
  client: {},
  server: {
    NODE_ENV: z.enum(['production', 'development', 'test']),
    PORT: z.coerce.number().min(0).max(65535),
    DATABASE_URL: z.string().url(),
    MAIL_HOST: z.string(),
    MAIL_PORT: z.coerce.number().min(1).max(65535),
    MAIL_USERNAME: z.string().min(1),
    MAIL_PASSWORD: z.string().min(1),
    CLOUDINARY_CLOUD_NAME: z.string().min(1),
    CLOUDINARY_API_KEY: z.string().min(1),
    CLOUDINARY_API_SECRET: z.string().min(1),
    MEDIA_SERVER_TYPE: z.enum(['cloudinary', 'localhost']),
    MEDIA_SERVER_URL: z.string().url(),
    MEDIA_SERVER_UPLOAD_PRESET: z.string().min(1),
    MEDIA_SERVER_FOLDER: z.string().min(1),
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
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USERNAME: process.env.MAIL_USERNAME,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    MEDIA_SERVER_TYPE: process.env.MEDIA_SERVER_TYPE,
    MEDIA_SERVER_UPLOAD_PRESET: process.env.MEDIA_SERVER_UPLOAD_PRESET,
    MEDIA_SERVER_FOLDER: process.env.MEDIA_SERVER_FOLDER,
    AUTH_SERVER_URL: process.env.AUTH_SERVER_URL,
    BASE_URL: process.env.BASE_URL
  }
})

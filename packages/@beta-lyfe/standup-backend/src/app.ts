import { Hono } from 'hono'
import { authRouter } from './features/auth'
import { pharmacyRouter } from './features/pharmacy'
import { consultationRouter } from './features/consultation'
import { doctorRouter } from './features/doctor'
import { patientRouter } from './features/patient'
import { compress } from 'hono/compress'
import { cors } from 'hono/cors'
import { logger as honoLogger } from 'hono/logger'
import { Logger } from './features/logger'
import { StatusCodes } from './features/http'
import cloudinary from './features/config/configs/cloudinary'

const apiRoutes = new Hono()
  .route('/auth', authRouter)
  .route('/pharmacy', pharmacyRouter)
  .route('/consultation', consultationRouter)
  .route('/doctors', doctorRouter)
  .route('/patients', patientRouter)

export const logger = Logger.getSubLogger({ name: 'ServerLogger' })

export const app = new Hono()
  .use(compress())
  .use(cors())
  .use(honoLogger())
  .use(async (_c, next) => {
    cloudinary
  await next()
})
  .route('/api', apiRoutes)
  .notFound((c) => c.json({ error: 'Not found' }, StatusCodes.NOT_FOUND))

export type App = typeof app

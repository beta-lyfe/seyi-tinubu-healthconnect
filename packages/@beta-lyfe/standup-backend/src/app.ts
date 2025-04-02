import { Hono } from 'hono'
import { router as pharmacyRouter } from './features/pharmacy'
import { compress } from 'hono/compress'
import { cors } from 'hono/cors'
import { logger as honoLogger } from 'hono/logger'
import { Logger } from './features/logger'
import { StatusCodes } from './features/http'

const apiRoutes = new Hono().route('/pharmacy', pharmacyRouter)

export const logger = Logger.getSubLogger({ name: 'ServerLogger' })

export const app = new Hono()
  .use(compress())
  .use(cors())
  .use(honoLogger())
  .route('/api', apiRoutes)
  .notFound((c) => c.json({ error: 'Not found' }, StatusCodes.NOT_FOUND))

export type App = typeof app

import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { router as pharmacyRouter } from './features/pharmacy'
import { config } from './features/config'
import { Logger } from './features/logger'
import { compress } from 'hono/compress'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { StatusCodes } from './features/http'

const serverLogger = Logger.getSubLogger({ name: 'ServerLogger' })

const apiRoutes = new Hono().route('/pharmacy', pharmacyRouter)

const app = new Hono()
  .use(compress())
  .use(cors())
  .use(logger())
  .route('/api', apiRoutes)
  .notFound((c) => c.json({ error: 'Not found' }, StatusCodes.NOT_FOUND))

serve(
  {
    fetch: app.fetch,
    port: config.server.port
  },
  (info) => {
    serverLogger.info(
      `Server is running on http://${info.address}:${info.port}`
    )
  }
)

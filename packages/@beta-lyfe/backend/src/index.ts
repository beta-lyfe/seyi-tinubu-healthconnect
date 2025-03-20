import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { router as pharmacyRouter } from './features/pharmacy'
import { config } from './features/config'
import { Logger } from './features/logger'

const logger = Logger.getSubLogger({ name: 'ServerLogger' })
const app = new Hono()
  .route('/pharmacy', pharmacyRouter)
  .notFound((c) => c.json({ error: 'Not found' }))

serve(
  {
    fetch: app.fetch,
    port: config.server.port
  },
  (info) => {
    logger.info(`Server is running on http://${info.address}:${info.port}`)
  }
)

import { serve } from '@hono/node-server'
import { config } from '@beta-lyfe/standup-backend/config'
import { app, logger } from '@beta-lyfe/standup-backend/app'

serve(
  {
    fetch: app.fetch,
    port: config.server.port
  },
  (info) => {
    logger.info(`Server is running on http://${info.address}:${info.port}`)
  }
)

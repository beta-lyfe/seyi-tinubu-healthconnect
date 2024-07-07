import { config } from "@beta-lyfe/backend/shared/config"
import { serve } from "@hono/node-server"
import { app } from "@beta-lyfe/backend/shared/app"
import { log } from "@beta-lyfe/backend/shared/logger"

serve({
  port: config.app.port,
  fetch: app.fetch,
}, (info) => log.info(`Server running on ${info.address}:${info.port}`))

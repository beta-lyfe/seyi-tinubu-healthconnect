import { config } from "@/shared/config"
import { serve } from "@hono/node-server"
import { app } from "@/shared/app"
import { log } from "@/shared/logger"

serve({
  port: config.app.port,
  fetch: app.fetch,
}, (info) => log.info(`Server running on ${info.address}:${info.port}`))

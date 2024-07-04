import { config } from "@/shared/config"
import { serve } from "@hono/node-server"
import { app } from "@/index"

serve({
  port: config.app.port,
  fetch: app.fetch,
}, (info) => console.log(`Server running on ${info.address}:${info.port}`))

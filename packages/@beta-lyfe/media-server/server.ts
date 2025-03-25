import { serve } from "@hono/node-server"
import { app, config } from "./src"

serve(
  {
    fetch: app.fetch,
    port: config.server.port
  },
  (info) => {
    console.log(`App running on port ${info.port}`)
  }
)

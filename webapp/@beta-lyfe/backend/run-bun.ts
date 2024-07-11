import { config } from "@beta-lyfe/backend/shared/config"
import { app } from "@beta-lyfe/backend/shared/app"

export default {
  port: config.app.port,
  fetch: app.fetch,
}

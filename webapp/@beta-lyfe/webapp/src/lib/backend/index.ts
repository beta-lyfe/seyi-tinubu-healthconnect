import { hc } from "hono/client"
import { App } from "@beta-lyfe/backend/shared/app"

const client = hc<App>("/")

export const backend = {
  client
}

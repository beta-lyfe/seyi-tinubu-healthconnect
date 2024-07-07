import { hc } from "hono/client"
import type { App } from "@beta-lyfe/backend"

const client = hc<App>("/")

export const backend = {
  client
}

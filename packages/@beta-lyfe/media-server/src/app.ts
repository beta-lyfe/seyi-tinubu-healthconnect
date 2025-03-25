import { Hono } from "hono"
import { serveStatic } from "@hono/node-server/serve-static"
import router from "./router"
import { logger } from "hono/logger"
import { cors } from "hono/cors"

export const app = new Hono()
  .use(logger())
  .use(
    "/*",
    cors({
      origin: ["http://localhost:3000", "http://127.0.0.1:3000"]
    })
  )
  .get(
    "/public/*",
    serveStatic({
      root: "./"
    })
  )
  .route("/", router)

export type App = typeof app
export default app

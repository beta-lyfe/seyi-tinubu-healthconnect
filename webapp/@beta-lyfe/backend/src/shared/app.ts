import { Hono } from "hono"
import { logger } from "hono/logger"
import { cors } from "hono/cors"
import { ServicesRouter } from "@/services"
import { APIResponse, toJsonResponse } from "./utils/response"
import { APIError } from "./utils/error"
import { log } from "./logger"

export const app = new Hono()
  .use(logger())
  .use(cors())
  .route("/api", ServicesRouter)
  .notFound(c => toJsonResponse(c, APIResponse.err('Route not found', 404)))
  .onError((err, c) => {
    log.error(`${err}`)

    if (err instanceof APIError)
      return toJsonResponse(c, err.toResponse())

    return toJsonResponse(c, APIResponse.err(err.message))
  })

export type App = typeof app

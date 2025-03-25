import { Hono } from "hono"
import { StatusCodes } from "http-status-codes"
import fs from "fs/promises"
import { ulid } from "ulidx"
import { z } from "zod"
import { zValidator } from "@hono/zod-validator"
import path from "path"
import config from "./config"

const deleteMiddleware = zValidator(
  "query",
  z.object({
    fileUrl: z.string().url()
  })
)

export default new Hono()
  .delete("/", deleteMiddleware, async (c) => {
    const { fileUrl } = c.req.valid("query")

    const url = new URL(fileUrl)
    const filepath = path.basename(url.pathname)

    await fs.unlink(`./public/uploads/${filepath}`)

    return c.json({}, StatusCodes.INTERNAL_SERVER_ERROR)
  })
  .post("/upload", async (c) => {
    const body = await c.req.parseBody()
    const maybeFile = body.file

    if (Array.isArray(maybeFile)) return c.json({}, StatusCodes.BAD_REQUEST)

    if (typeof maybeFile === "string")
      return c.json({}, StatusCodes.BAD_REQUEST)

    const file = maybeFile

    const id = ulid()
    const ext = path.extname(file.name)
    const fullFileName = `${id}${ext}`

    await fs.writeFile(
      `./public/uploads/${fullFileName}`,
      new Uint8Array(await file.arrayBuffer())
    )

    const details = {
      secure_url: `${config.server.url}/public/uploads/${fullFileName}`
    }

    return c.json(details, StatusCodes.OK)
  })

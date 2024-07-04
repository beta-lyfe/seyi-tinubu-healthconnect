import { config } from "@/shared/config";
import { APIResponse, toJsonResponse } from "@/shared/utils/response";
import { Hono } from "hono";
import { z } from "zod"

const ApiSchema = z.object({
  message: z.string(),
  data: z.object({
    roomId: z.string()
  })
})

export const Router = new Hono()
  .post("/", async (c) => {
    try {
      const res = await fetch('https://api.huddle01.com/api/v1/create-room', {
        method: "POST",
        body: JSON.stringify({
          title: "Doctor's Consultation",
          roomLock: false,
        }),
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.huddle01.apiKey,
        }
      });


      if (res.status !== 200)
        return toJsonResponse(c, APIResponse.err("Failed to create room"))

      const jsonParseResult = ApiSchema.safeParse(await res.json())
      if (!jsonParseResult.success)
        return toJsonResponse(c, APIResponse.err("Invalid response from huddle API"))

      const json = jsonParseResult.data

      return toJsonResponse(c, APIResponse.ok(json.data))
    } catch (err) {
      console.warn(err)
      return toJsonResponse(c, APIResponse.err("Sorry an error occurred!"))
    }
  })

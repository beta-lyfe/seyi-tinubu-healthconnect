import config from "@/shared/config";
import { APIResponse, toJsonResponse } from "@/shared/utils/response";
import { Hono } from "hono";

export const Router = new Hono()
  .post("/", async (c) => {
    try {
      const res = await fetch('https://api.huddle01.com/api/v1/create-room', {
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

      const json: {} = await res.json()

      return toJsonResponse(c, APIResponse.ok(json))
    } catch (err) {
      console.warn(err)
      return toJsonResponse(c, APIResponse.err("Sorry an error occurred!"))
    }
  })

import { config } from "@beta-lyfe/backend/shared/config";
import { APIResponse, toJsonResponse } from "@beta-lyfe/backend/shared/utils/response";
import { log } from "@beta-lyfe/backend/shared/logger";
import { AccessToken, Role } from '@huddle01/server-sdk/auth';
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
      log.error(err)
      return toJsonResponse(c, APIResponse.err("Sorry an error occurred while trying to create a room!"))
    }
  })
  .get("/:id/access-token", async (c) => {
    const roomId = c.req.param('id')

    const accessToken = new AccessToken({
      apiKey: config.huddle01.apiKey,
      roomId: roomId,
      role: Role.HOST,
      permissions: {
        admin: true,
        canConsume: true,
        canProduce: true,
        canProduceSources: {
          cam: true,
          mic: true,
          screen: true,
        },
        canRecvData: true,
        canSendData: true,
        canUpdateMetadata: true,
      }
    });

    const token = await accessToken.toJwt();

    return toJsonResponse(c, APIResponse.ok(token))
  })

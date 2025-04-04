import { Hono } from 'hono'
import middleware from './middleware'
import service from './service'
import { StatusCodes } from '../../../http'
import type { schema } from '@beta-lyfe/api'

export type ApiResponse =
  | schema.components['schemas']['Api.Authentication.AuthCredentials']
  | schema.components['schemas']['Api.UnauthorizedError']
  | schema.components['schemas']['Api.UnexpectedError']

export default new Hono().post('/sign-in', middleware, async (c) => {
  const payload = c.req.valid('json')

  const result = await service(payload)

  let response: ApiResponse

  if (result.isErr) {
    response = {
      code: 'UNAUTHORIZED_ERROR'
    }
    return c.json(response, StatusCodes.UNAUTHORIZED)
  }

  const tokens = result.value

  response = {
    code: 'AUTH_CREDENTIALS',
    data: {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken
    }
  }

  return c.json(response)
})

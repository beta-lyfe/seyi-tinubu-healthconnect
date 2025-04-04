import { Hono } from 'hono'
import type { schema } from '@beta-lyfe/api'
import service from './service'
import { StatusCodes } from 'http-status-codes'
import middleware from './middleware'

export type ApiResponse =
  | schema.components['schemas']['Api.Authentication.PasswordResetSuccessful']
  | schema.components['schemas']['Api.Authentication.InvalidOrExpiredTokenError']
  | schema.components['schemas']['Api.BadRequestError']
  | schema.components['schemas']['Api.UnexpectedError']

export default new Hono().post('/:token', ...middleware, async (c) => {
  const paramPayload = c.req.valid('param')
  const bodyPayload = c.req.valid('json')

  const payload = Object.assign(paramPayload, bodyPayload)

  let response: ApiResponse

  const result = await service(payload)
  if (result.isErr) {
    switch (result.error) {
      case 'INVALID_OR_EXPIRED_TOKEN': {
        response = {
          code: 'INVALID_OR_EXPIRED_TOKEN_ERROR'
        }

        return c.json(response, StatusCodes.BAD_REQUEST)
      }
      case 'UNEXPECTED_ERROR': {
        response = {
          code: 'UNEXPECTED_ERROR'
        }
        return c.json(response, StatusCodes.INTERNAL_SERVER_ERROR)
      }
    }
  }

  response = {
    code: 'PASSWORD_RESET_SUCCESSFUL'
  }

  return c.json(response)
})

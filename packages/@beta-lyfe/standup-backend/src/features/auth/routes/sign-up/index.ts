import { Hono } from 'hono'
import { StatusCodes } from '../../../http'
import service from './service'
import middleware from './middleware'
import type { schema } from '@beta-lyfe/api'

export type Response =
  schema.paths['/api/auth/sign-up']['post']['responses'][keyof schema.paths['/api/auth/sign-up']['post']['responses']]['content']['application/json']

export default new Hono().post('/sign-up', middleware, async (c) => {
  const payload = c.req.valid('json')

  const result = await service(payload)

  let response: Response

  if (result.isErr) {
    switch (result.error) {
      case 'EMAIL_ALREADY_IN_USE': {
        response = {
          code: 'EMAIL_ALREADY_IN_USE_ERROR'
        }
        return c.json(response, StatusCodes.CONFLICT)
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
    code: 'SIGNUP_SUCCESSFUL'
  }

  return c.json(response)
})

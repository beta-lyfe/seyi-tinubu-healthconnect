import { Hono } from 'hono'
import { AuthMiddleware } from '../../../../auth'
import { StatusCodes } from '../../../../http'
import type { paths } from '@beta-lyfe/api/types'
import service from './service'
import middleware from './middleware'

export type Response =
  paths['/api/doctors/profile']['put']['responses'][keyof paths['/api/doctors/profile']['put']['responses']]['content']['application/json']

export default new Hono().put(
  '/',
  AuthMiddleware.middleware,
  middleware,
  async (c) => {
    const user = c.get('user')
    const payload = c.req.valid('form')

    let response: Response

    const result = await service(user, payload)

    if (result.isErr) {
      response = {
        code: 'UNAUTHORIZED_ERROR'
      }
      return c.json(response, StatusCodes.UNAUTHORIZED)
    }

    const profile = result.value

    if (!profile) {
      response = {
        code: 'UNAUTHORIZED_ERROR'
      }
      return c.json(response, StatusCodes.UNAUTHORIZED)
    }

    response = {
      code: 'DOCTOR_PROFILE_UPDATED'
    }

    return c.json(response)
  }
)

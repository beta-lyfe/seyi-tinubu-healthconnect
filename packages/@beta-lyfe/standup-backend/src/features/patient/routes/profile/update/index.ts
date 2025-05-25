import { Hono } from 'hono'
import { AuthMiddleware } from '../../../../auth'
import { StatusCodes } from '../../../../http'
import type { schema } from '@beta-lyfe/api'
import service from './service'
import middleware from './middleware'

export type Response =
  schema.paths['/api/patients/profile']['patch']['responses'][keyof schema.paths['/api/patients/profile']['patch']['responses']]['content']['application/json']

export default new Hono().patch(
  '/',
  AuthMiddleware.middleware,
  middleware,
  async (c) => {
    const user = c.get('user')
    const payload = c.req.valid('form')

    let response: Response

    console.log(payload)

    const result = await service(user, payload)
    console.log('an error occurred')

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
      code: 'PATIENT_PROFILE_UPDATED'
    }

    return c.json(response)
  }
)

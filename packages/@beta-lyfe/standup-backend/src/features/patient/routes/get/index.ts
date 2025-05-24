import { Hono } from 'hono'
import { AuthMiddleware } from '../../../auth'
import { StatusCodes } from '../../../http'
import type { paths } from '@beta-lyfe/api/types'
import service from './service'
import middleware from './middleware'

export type Response =
  paths['/api/patients/{id}']['get']['responses'][keyof paths['/api/patients/{id}']['get']['responses']]['content']['application/json']

export default new Hono().get(
  '/:id',
  AuthMiddleware.middleware,
  middleware,
  async (c) => {
    const payload = c.req.valid('param')

    let response: Response

    const result = await service(payload)

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
      code: 'FETCH_PATIENT_PROFILE_SUCCESSFUL',
      data: profile
    }

    return c.json(response)
  }
)

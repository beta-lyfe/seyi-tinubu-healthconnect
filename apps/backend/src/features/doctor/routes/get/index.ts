import { Hono } from 'hono'
import { AuthMiddleware } from '../../../auth'
import { StatusCodes } from '../../../http'
import type { paths } from '@beta-lyfe/api/types'
import service from './service'
import middleware from './middleware'
import { DoctorRepository } from '../..'

export type Response =
  paths['/api/doctors/{id}']['get']['responses'][keyof paths['/api/doctors/{id}']['get']['responses']]['content']['application/json']

export default new Hono().get(
  '/:id',
  AuthMiddleware.middleware,
  middleware,
  async (c) => {
    const { id } = c.req.param()
    let response: Response

    const result = await service({ id })

    if (result.isErr) {
      response = {
        code: 'UNAUTHORIZED_ERROR'
      }
      return c.json(response, StatusCodes.UNAUTHORIZED)
    }

    const profile = result.value

    console.log('Here')

    if (!profile) {
      response = {
        code: 'UNAUTHORIZED_ERROR'
      }
      return c.json(response, StatusCodes.UNAUTHORIZED)
    }

    response = {
      code: 'FETCH_DOCTOR_PROFILE_SUCCESSFUL',
      data: profile
    }

    return c.json(response)
  }
)

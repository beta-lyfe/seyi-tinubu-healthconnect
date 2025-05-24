import { Hono } from 'hono'
import { AuthMiddleware } from '../../../auth'
import { StatusCodes } from '../../../http'
import type { paths } from '@beta-lyfe/api/types'
import service from './service'
import middleware from './middleware'
import DoctorMiddleware from '../../middleware'

export type Response =
  paths['/api/doctors']['post']['responses'][keyof paths['/api/doctors']['post']['responses']]['content']['application/json']

export default new Hono().post(
  '/',
  AuthMiddleware.middleware,
  DoctorMiddleware.middleware,
  middleware,
  async (c) => {
    const user = c.get('user')
    const body = c.req.valid('json')

    let response: Response

    const result = await service({
      body,
      user
    })

    if (result.isErr) {
      response = {
        code: 'UNEXPECTED_ERROR'
      }
      return c.json(response, StatusCodes.INTERNAL_SERVER_ERROR)
    }

    response = {
      code: 'DOCTOR_PROFILE_CREATED'
    }

    return c.json(response)
  }
)

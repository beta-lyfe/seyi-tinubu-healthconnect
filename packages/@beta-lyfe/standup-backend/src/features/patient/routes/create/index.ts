import { Hono } from 'hono'
import { AuthMiddleware } from '../../../auth'
import { StatusCodes } from '../../../http'
import type { paths } from '@beta-lyfe/api/types'
import service from './service'
import middleware from './middleware'
import { PatientMiddleware } from '../../middleware'

export type Response =
  paths['/api/patients']['post']['responses'][keyof paths['/api/patients']['post']['responses']]['content']['application/json']

export default new Hono().post(
  '/',
  AuthMiddleware.middleware,
  middleware,
  PatientMiddleware.middleware,
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
      code: 'PATIENT_PROFILE_CREATED'
    }

    return c.json(response)
  }
)

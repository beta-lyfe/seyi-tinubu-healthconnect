import { Hono } from 'hono'
import * as am from '../../../../auth'
import { AuthMiddleware } from '../../../../auth'
import { StatusCodes } from '../../../../http'
import type { paths } from '@beta-lyfe/api/types'
import service from './service'

export type Response =
  paths['/api/doctors/profile']['get']['responses'][keyof paths['/api/doctors/profile']['get']['responses']]['content']['application/json']

export default new Hono().get('/', AuthMiddleware.middleware, async (c) => {
  const user = c.get('user')

  let response: Response

  const result = await service(user)

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
    code: 'FETCH_DOCTOR_PROFILE_SUCCESSFUL',
    data: profile
  }

  return c.json(response)
})

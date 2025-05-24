import { Hono } from 'hono'
import { AuthMiddleware } from '../../../../auth'
import { StatusCodes } from '../../../../http'
import type { paths } from '@beta-lyfe/api/types'
import service from './service'

export type Response =
  paths['/api/patients/profile']['get']['responses'][keyof paths['/api/patients/profile']['get']['responses']]['content']['application/json']

export default new Hono().get('/', AuthMiddleware.middleware, async (c) => {
  const user = c.get('user')

  let response: Response

  const result = await service(user)
  console.log(result)

  if (result.isErr) {
    response = {
      code: 'UNAUTHORIZED_ERROR'
    }
    return c.json(response, StatusCodes.UNAUTHORIZED)
  }

  const profile = result.value

  if (!profile) {
    response = {
      code: 'PATIENT_PROFILE_NOT_FOUND_ERROR'
    }
    return c.json(response, StatusCodes.NOT_FOUND)
  }

  response = {
    code: 'FETCH_PATIENT_PROFILE_SUCCESSFUL',
    data: profile
  }

  return c.json(response)
})

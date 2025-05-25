import { Hono } from 'hono'
import { StatusCodes } from '../../../http'
import type { schema } from '@beta-lyfe/api'
import middleware from './middleware'
import { Pagination } from '../../../pagination'
import service from './service'

export type Response =
  schema.paths['/api/patients/']['get']['responses'][keyof schema.paths['/api/patients/']['get']['responses']]['content']['application/json']

export default new Hono().get('/', middleware, async (c) => {
  const options = c.req.valid('query')

  const result = await service(options)

  let response: Response

  if (result.isErr) {
    response = {
      code: 'UNEXPECTED_ERROR'
    }
    return c.json(response, StatusCodes.INTERNAL_SERVER_ERROR)
  }

  const { items, count } = result.value

  response = {
    code: 'FETCH_PATIENT_PROFILES_SUCCESSFUL',
    data: Pagination.paginate(items, { ...options, total: count })
  }

  return c.json(response)
})

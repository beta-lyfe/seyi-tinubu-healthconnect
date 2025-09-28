import { Hono } from 'hono'
import middleware from './middleware'
import { AuthMiddleware } from '../../../auth'
import { APIResponse, StatusCodes } from '../../../http'
import service from './service'

export default new Hono().post(
  '/',
  AuthMiddleware.middleware,
  middleware,
  async (c) => {
    const user = c.get('user')
    const inputPayload = c.req.valid('form')
    const result = await service(user, inputPayload)
    if (result.isErr)
      return c.json(
        APIResponse.err('Failed to create store'),
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    const store = result.value
    return c.json(APIResponse.ok(store))
  }
)

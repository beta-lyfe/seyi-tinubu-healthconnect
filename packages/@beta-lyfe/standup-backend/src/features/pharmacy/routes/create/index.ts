import { Hono } from 'hono'
import { Repository } from '../..'
import middleware from './middleware'
import { AuthMiddleware } from '../../../auth'
import { APIResponse } from '../../../http'

export default new Hono().post(
  '/',
  AuthMiddleware.middleware,
  middleware,
  async (c) => {
    const user = c.get('user')
    const inputPayload = c.req.valid('json')
    const store = await Repository.create({
      ...inputPayload,
      ownerId: user.data.id
    })
    return c.json(APIResponse.ok(store))
  }
)

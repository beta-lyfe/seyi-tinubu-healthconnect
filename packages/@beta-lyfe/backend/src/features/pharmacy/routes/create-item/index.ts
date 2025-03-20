import { Hono } from 'hono'
import { Repository } from '../..'
import middleware from './middleware'

export default new Hono().post('/items', middleware, async (c) => {
  const inputPayload = c.req.valid('json')
  const store = await Repository.createItem(inputPayload)
  return c.json(store)
})

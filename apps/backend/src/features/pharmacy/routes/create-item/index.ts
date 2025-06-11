import { Hono } from 'hono'
import { PharmacyRepository } from '../..'
import middleware from './middleware'
import { APIResponse } from '../../../http'

export default new Hono().post('/items', middleware, async (c) => {
  const payload = c.req.valid('json')
  const store = await PharmacyRepository.createItem(payload)
  return c.json(APIResponse.ok(store))
})

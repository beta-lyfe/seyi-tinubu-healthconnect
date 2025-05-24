import { Hono } from 'hono'
import Repository from '../../repository'
import { APIResponse } from '../../../http'

export default new Hono().get('/:id', async (c) => {
  const id = c.req.param('id')
  const store = await Repository.findById(id)
  return c.json(APIResponse.ok(store))
})

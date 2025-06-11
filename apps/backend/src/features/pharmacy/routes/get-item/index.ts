import { Hono } from 'hono'
import Repository from '../../repository'
import { APIResponse } from '../../../http'

export default new Hono().get('/items/:id', async (c) => {
  const id = c.req.param('id')
  const item = await Repository.findItemById(id)
  return c.json(APIResponse.ok(item))
})

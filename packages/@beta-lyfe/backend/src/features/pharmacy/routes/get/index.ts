import { Hono } from 'hono'
import { Repository } from '../..'

export default new Hono().get('/:id', async (c) => {
  const id = c.req.param('id')
  const store = await Repository.findById(id)
  return c.json(store)
})

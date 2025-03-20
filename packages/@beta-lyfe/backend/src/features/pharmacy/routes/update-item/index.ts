import { Hono } from 'hono'
import middleware from './middleware'
import { Repository } from '../..'

export default new Hono().patch('/items/:id', middleware, async (c) => {
  const id = c.req.param('id')
  const payload = c.req.valid('json')

  await Repository.updateItemById(id, payload)

  return c.json({ message: 'Updated successfully' })
})

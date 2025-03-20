import { Hono } from 'hono'
import middleware from './middleware'
import { Repository } from '../..'

export default new Hono().patch('/:id', middleware, async (c) => {
  const id = c.req.param('id')
  const payload = c.req.valid('json')

  await Repository.updateById(id, payload)

  return c.json({ message: 'Updated successfully' })
})

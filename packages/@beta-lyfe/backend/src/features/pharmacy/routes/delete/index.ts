import { Hono } from 'hono'
import { Repository } from '../..'

export default new Hono().delete('/:id', async (c) => {
  const id = c.req.param('id')

  await Repository.deleteById(id)

  return c.json({ message: 'Deleted successfully' })
})

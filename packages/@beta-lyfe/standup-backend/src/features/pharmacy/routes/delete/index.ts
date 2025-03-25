import { Hono } from 'hono'
import { Repository } from '../..'
import { APIResponse } from '../../../http'

export default new Hono().delete('/:id', async (c) => {
  const id = c.req.param('id')

  await Repository.deleteById(id)

  return c.json(APIResponse.ok({ message: 'Deleted successfully' }))
})

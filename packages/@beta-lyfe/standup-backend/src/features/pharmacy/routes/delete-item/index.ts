import { Hono } from 'hono'
import { Repository } from '../..'
import { APIResponse } from '../../../http'

export default new Hono().delete('/items/:id', async (c) => {
  const id = c.req.param('id')

  await Repository.deleteItemById(id)

  return c.json(APIResponse.ok({ message: 'Deleted successfully' }))
})

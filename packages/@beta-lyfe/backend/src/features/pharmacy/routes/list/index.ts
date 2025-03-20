import { Hono } from 'hono'
import middleware from './middleware'
import { Repository } from '../..'
import { Pagination } from '../../../pagination'

export default new Hono().get('/', middleware, async (c) => {
  const options = c.req.valid('query')
  const { items, count } = await Repository.findManyPharmaciesWithCount(options)
  return c.json(Pagination.paginate(items, { ...options, total: count }))
})

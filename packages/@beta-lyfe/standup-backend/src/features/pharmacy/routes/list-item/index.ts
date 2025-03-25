import { Hono } from 'hono'
import middleware from './middleware'
import { Repository } from '../..'
import { Pagination } from '../../../pagination'
import { APIResponse, StatusCodes } from '../../../http'

export default new Hono().get('/items', middleware, async (c) => {
  const options = c.req.valid('query')
  const res = await Repository.findManyPharmacyItemsWithCount(options)
  if (res.isErr) {
    return c.json(
      APIResponse.err({ error: 'Sorry, an unexpected error occurred' }),
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }

  const { items, count } = res.value

  return c.json(
    APIResponse.ok(Pagination.paginate(items, { ...options, total: count }))
  )
})

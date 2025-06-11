import { Hono } from 'hono'
import createRouter from './create'
import createItemRouter from './create-item'
import listRouter from './list'
import listItemRouter from './list-item'
import getRouter from './get'
import getItemRouter from './get-item'
import updateRouter from './update'
import updateItemRouter from './update-item'
import deleteRouter from './delete'
import deleteItemRouter from './delete-item'

export default new Hono()
  .route('/', createRouter)
  .route('/', createItemRouter)
  .route('/', getRouter)
  .route('/', getItemRouter)
  .route('/', listRouter)
  .route('/', listItemRouter)
  .route('/', updateRouter)
  .route('/', updateItemRouter)
  .route('/', deleteRouter)
  .route('/', deleteItemRouter)

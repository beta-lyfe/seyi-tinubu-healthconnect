import { Hono } from 'hono'
import listRouter from './list'
import profileRouter from './profile'
import getRouter from './get'
import createRouter from './create'

export default new Hono()
  .route('/', createRouter)
  .route('/', listRouter)
  .route('/', profileRouter)
  .route('/', getRouter)

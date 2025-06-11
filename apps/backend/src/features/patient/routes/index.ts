import { Hono } from 'hono'
import createRouter from './create'
import getRouter from './get'
import listRouter from './list'
import profileRouter from './profile'

export default new Hono()
  .route('/', createRouter)
  .route('/', listRouter)
  .route('/', profileRouter)
  .route('/', getRouter)

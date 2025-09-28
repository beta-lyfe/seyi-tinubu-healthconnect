import { Hono } from 'hono'
import getRouter from './get'
import updateRouter from './update'
import updateImageRouter from './picture'

export default new Hono().route(
  '/profile',
  new Hono().route('/', getRouter).route('/', updateRouter).route('/',updateImageRouter)
)

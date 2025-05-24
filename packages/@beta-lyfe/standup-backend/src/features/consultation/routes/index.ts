import { Hono } from 'hono'
import createConsultationRouter from './create'
import listConsultationRouter from './list'
import listRequestConsultationRouter from './list-request'
import listRequestIdConsultationRouter from './list-request-id'
import listRequestIAcceptRouter from './list-request-id-accept'

export { default as router } from '.'
export { default as Repository } from '../repository'
export * from '../middleware'

export default new Hono()
  .route('/', createConsultationRouter)
  .route('/', listConsultationRouter)
  .route('/', listRequestConsultationRouter)
  .route('/', listRequestIdConsultationRouter)
  .route('/', listRequestIAcceptRouter)

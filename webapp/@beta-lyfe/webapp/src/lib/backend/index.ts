import { hc } from 'hono/client'
import type { App } from '@beta-lyfe/backend'
import api from './api'

const client = hc<App>('/')

export const backend = {
  client,
  api
}

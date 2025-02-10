import { createClient, createReactQueryClient } from '@beta-lyfe/api'
import { env } from '../env'

export const client = createClient(env.VITE_BACKEND_URL)
export const $api = createReactQueryClient(client)
import { createClient } from '@beta-lyfe/api'
import { env } from '../src/env'

import * as ozc from '../schema'
export { ozc }
export const client = createClient(env.BACKEND_URL)

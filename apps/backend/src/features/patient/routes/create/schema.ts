import type { z } from 'zod'
import { schemas } from '@beta-lyfe/api/zod'

const schema = schemas.Api_Patient_Create_Request_Body

export type Schema = z.infer<typeof schema>

export default schema

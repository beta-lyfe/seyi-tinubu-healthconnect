import type { z } from 'zod'
import { schemas } from '@beta-lyfe/api/zod'
import { Storage } from '../../../../storage'
import { schema as dbSchema } from '../../../../database'

const schema = schemas.Api_Doctor_Profile_Update_Body.omit({
  location: true
}).extend({
  location: dbSchema.address
})

export type Schema = z.infer<typeof schema>

export default schema

import  z  from 'zod'
import { schemas } from '@beta-lyfe/api/zod'
import { Storage } from '../../../../storage'

const schema = schemas.Api_Patient_Profie_Update_Body.omit({
  profile_picture: true
}).extend({
  profile_picture: Storage.schema.file.optional()
})


export type Schema = z.infer<typeof schema>

export default schema

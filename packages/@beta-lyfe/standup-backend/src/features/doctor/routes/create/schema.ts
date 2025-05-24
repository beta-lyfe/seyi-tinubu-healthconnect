import { z } from 'zod'
import { schemas } from '@beta-lyfe/api/zod'
import { Storage } from '../../../storage'

const schema = schemas.Api_Doctor_Create_request_Body.omit({
  certifications: true,
  experiences: true,
  working_hours: true
}).extend({
  certifications: z.array(schemas.Api_Doctor_Certification),
  experiences: z.array(schemas.Api_Doctor_Experience),
  working_hours: z.array(schemas.Api_Doctor_WorkingHour)
})

export type Schema = z.infer<typeof schema>

export default schema

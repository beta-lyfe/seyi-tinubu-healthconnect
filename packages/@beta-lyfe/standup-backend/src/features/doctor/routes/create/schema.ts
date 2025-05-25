import { z } from 'zod'
import { schemas } from '@beta-lyfe/api/zod'
import { Storage } from '../../../storage'

const schema = schemas.Api_Doctor_Create_request_Body.omit({
  certifications: true,
  experiences: true,
  working_hours: true,
  profile_picture: true,
  rating: true,
  patients_treated: true,
  number_of_reviews: true
})

export type Schema = z.infer<typeof schema>

export default schema

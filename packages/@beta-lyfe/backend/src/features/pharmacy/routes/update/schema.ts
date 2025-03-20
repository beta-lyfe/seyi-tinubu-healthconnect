import { createUpdateSchema } from 'drizzle-zod'
import { schema } from '../../../database'

export default createUpdateSchema(schema.pharmacyStores)
  .omit({ coverImage: true })
  .extend({ coverImage: schema.media })

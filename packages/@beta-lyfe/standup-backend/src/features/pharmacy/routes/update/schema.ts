import { createUpdateSchema } from 'drizzle-zod'
import { schema } from '../../../database'

export default createUpdateSchema(schema.pharmacyStores)
  .omit({ cover_image: true })
  .extend({ cover_image: schema.media })

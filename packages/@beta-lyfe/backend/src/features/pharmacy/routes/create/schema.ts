import { createInsertSchema } from 'drizzle-zod'
import { schema } from '../../../database'

export default createInsertSchema(schema.pharmacyStores)
  .omit({ coverImage: true })
  .extend({ coverImage: schema.media })

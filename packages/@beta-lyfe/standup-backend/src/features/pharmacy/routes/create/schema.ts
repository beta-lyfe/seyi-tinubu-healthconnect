import { createInsertSchema } from 'drizzle-zod'
import { Storage } from '../../../storage'
import { schema } from '../../../database'

export default createInsertSchema(schema.pharmacyStores)
  .omit({ coverImage: true, ownerId: true })
  .extend({ coverImage: Storage.schema.file })

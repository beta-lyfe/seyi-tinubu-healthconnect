import { createInsertSchema } from 'drizzle-zod'
import { Storage } from '../../../storage'
import { schema as dbSchema } from '../../../database'
import type { z } from 'zod'

const schema = createInsertSchema(dbSchema.pharmacyStores)
  .omit({ cover_image: true, owner_id: true })
  .extend({ cover_image: Storage.schema.file })

export type Schema = z.infer<typeof schema>

export default schema

import { createInsertSchema } from 'drizzle-zod'
import { schema as dbSchema } from '../../../database'
import type { z } from 'zod'

const schema = createInsertSchema(dbSchema.pharmacyStores)
  .omit({
    owner_id: true,
    address: true
  })
  .extend({
    address: dbSchema.address
  })

export type Schema = z.infer<typeof schema>

export default schema

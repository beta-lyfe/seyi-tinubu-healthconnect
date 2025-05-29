import { createInsertSchema } from 'drizzle-zod'
import { Storage } from '../../../storage'
import { schema as dbSchema } from '../../../database'
import type { z } from 'zod'

const schema = createInsertSchema(dbSchema.pharmacyStores).omit({
  owner_id: true
})

export type Schema = z.infer<typeof schema>

export default schema

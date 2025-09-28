import { createInsertSchema } from 'drizzle-zod'
import { schema } from '../../../database'
import { z } from 'zod'

export default createInsertSchema(schema.pharmacyStoreItems)
  .omit({
    images: true,
    type: true,
    categories: true,
    brands: true
  })
  .extend({
    images: z.array(schema.media),
    type: z.union([z.literal('otc'), z.literal('prescription')]),
    categories: z.array(z.string()),
    brands: z.array(z.string())
  })

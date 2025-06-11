import { createUpdateSchema } from 'drizzle-zod'
import { schema } from '../../../database'
import { z } from 'zod'

export default createUpdateSchema(schema.pharmacyStoreItems)
  .omit({
    images: true,
    type: true,
    categories: true,
    brands: true
  })
  .extend({
    images: z.array(schema.media).optional(),
    type: z.union([z.literal('otc'), z.literal('prescription')]).optional(),
    categories: z.array(z.string()).optional(),
    brands: z.array(z.string()).optional()
  })

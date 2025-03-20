import { createUpdateSchema } from 'drizzle-zod'
import { schema } from '../../../database'
import { z } from 'zod'

export default createUpdateSchema(schema.pharmacyStoreItems)
  .omit({
    images: true
  })
  .extend({ images: z.array(schema.media) })

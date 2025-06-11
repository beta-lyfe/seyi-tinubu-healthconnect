import { Pagination } from '../../../pagination'
import { z } from 'zod'

export const filtersSchema = z.object({
  medication_type: z.enum(['otc', 'prescription']).optional(),
  price_range: z
    .object({
      min: z.number().optional(),
      max: z.number().optional()
    })
    .optional(),
  is_available: z.boolean().optional(),
  categories: z.array(z.string()).optional(),
  brands: z.array(z.string()).optional()
})

export type FiltersSchema = z.infer<typeof filtersSchema>
export default Pagination.schema.merge(filtersSchema)

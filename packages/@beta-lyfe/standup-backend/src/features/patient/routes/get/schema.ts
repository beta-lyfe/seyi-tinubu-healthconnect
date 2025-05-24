import { z } from 'zod'

const schema = z.object({
  id: z.string().ulid()
})

export type Schema = z.infer<typeof schema>

export default schema

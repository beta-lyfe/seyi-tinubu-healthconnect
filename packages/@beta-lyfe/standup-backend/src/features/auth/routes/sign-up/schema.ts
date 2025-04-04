import { z } from 'zod'

const schema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  password: z.string(),
  phone_number: z.string(),
  is_doctor: z.boolean()
})

export type Schema = z.infer<typeof schema>
export default schema
import { z } from 'zod'

export default z.object({
  doctor_id: z.string(),
  start_time: z.string().datetime(),
  end_time: z.string().datetime(),
  message: z.string()
})

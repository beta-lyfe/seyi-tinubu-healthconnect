import { zValidator } from "@hono/zod-validator";
// import schema from './schema'

// export default zValidator('json',schema , (result, c) => {
//   if (!result.success) {
//     return c.json({ error: 'Validation failed', details: result.error.flatten() }, 400);
//   }
// })
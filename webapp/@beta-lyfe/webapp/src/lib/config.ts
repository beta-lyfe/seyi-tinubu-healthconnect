import { z } from "zod";

const EnvSchema = z.object({
  HUDDLE01_PROJECT_ID: z.string().catch("PROJECT_ID_NOT_SET")
})

const env = EnvSchema.parse({
  HUDDLE01_PROJECT_ID: import.meta.env.VITE_HUDDLE01_PROJECT_ID
})

export const config = {
  huddle01: {
    projectId: env.HUDDLE01_PROJECT_ID
  }
}

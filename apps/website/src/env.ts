
import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

const getEnv = (name: string) => {
  const env =
    typeof process !== 'undefined'
      ? process.env
      : typeof ((import.meta as any)?.env as
            | Record<string, string>
            | undefined) !== 'undefined'
        ? ((import.meta as any).env as Record<string, string>)
        : {}

  return env[name]
}

export const env = createEnv({
  server: {},
  clientPrefix: 'VITE_',
  client: {
    VITE_BACKEND_URL: z.string().url()
  },
  runtimeEnv: {
    VITE_BACKEND_URL: getEnv('VITE_BACKEND_URL')
  },
})

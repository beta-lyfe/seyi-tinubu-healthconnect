import { handle } from 'hono/vercel'
import { app } from '@beta-lyfe/standup-backend/app'

const handler = handle(app)

export const GET = handler
export const POST = handler
export const PUT = handler
export const OPTIONS = handler
export const PATCH = handler
export const DELETE = handler

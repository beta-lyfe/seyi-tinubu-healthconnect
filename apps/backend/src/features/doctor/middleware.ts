import type { MiddlewareHandler } from 'hono'
import type { User } from '../auth/types'
import { StatusCodes } from '../http'
import type { types } from '@beta-lyfe/api'
import type { DoctorProfile } from '../database/schema'

export type Response =
  | types.components['schemas']['Api.UnauthorizedError']
  | types.components['schemas']['Api.UserNotVerifiedError']
  | types.components['schemas']['Api.UnexpectedError']

namespace DoctorMiddleware {
  export const middleware: MiddlewareHandler<{
    Variables: {
      user: User
      doctorProfile: DoctorProfile
    }
  }> = async (c, next) => {
    const user = c.get('user')
    const response = {
      code: 'ONLY_DOCTORS_ALLOWED'
    }
    if (!(user.data.role === 'doctor'))
      return c.json(response, StatusCodes.UNAUTHORIZED)
    c.set('doctorProfile', user.profiles.doctor!)
    await next()
  }
}

export default DoctorMiddleware
